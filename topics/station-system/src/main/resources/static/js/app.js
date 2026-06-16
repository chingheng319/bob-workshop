// API 基礎 URL
const API_URL = '/api/stations';

// 全域變數
let allStations = [];
let editModal;

    
    // 載入回饋資料
    loadAllFeedbacks();
    
    // 設定回饋表單提交事件
    setupFeedbackFormSubmit();
// 頁面載入時執行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Bootstrap Modal
    editModal = new bootstrap.Modal(document.getElementById('editModal'));
    
    // 載入車站資料
    loadStations();
    
    // 設定表單提交事件
    setupFormSubmit();
    
    // 設定搜尋與篩選事件
    setupSearchAndFilter();
});

/**
 * 載入所有車站
 */
async function loadStations() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('載入車站失敗');
        }
        allStations = await response.json();
        
        // 更新統計資料
        updateStatistics();
        
        // 更新路線規劃下拉選單
        updateRouteSelects();
        
        // 顯示車站列表
        displayStations(allStations);
    } catch (error) {
        console.error('載入車站錯誤:', error);
        showError('載入車站資料失敗，請重新整理頁面');
    }
}

/**
 * 更新統計資料
 */
function updateStatistics() {
    const total = allStations.length;
    const redLine = allStations.filter(s => s.line === '紅線').length;
    const orangeLine = allStations.filter(s => s.line === '橘線').length;
    
    document.getElementById('totalStations').textContent = total;
    document.getElementById('redLineStations').textContent = redLine;
    document.getElementById('orangeLineStations').textContent = orangeLine;
}

    
    // 更新回饋統計
    updateFeedbackStats();
/**
 * 更新路線規劃下拉選單
 */
function updateRouteSelects() {
    const startSelect = document.getElementById('startStation');
    const endSelect = document.getElementById('endStation');
    
    // 清空現有選項
    startSelect.innerHTML = '<option value="">請選擇起點站</option>';
    endSelect.innerHTML = '<option value="">請選擇終點站</option>';
    
    // 按代碼排序
    const sortedStations = [...allStations].sort((a, b) => a.code.localeCompare(b.code));
    
    // 加入選項
    sortedStations.forEach(station => {
        const option1 = new Option(`${station.code} - ${station.name}`, station.id);
        const option2 = new Option(`${station.code} - ${station.name}`, station.id);
        startSelect.add(option1);
        endSelect.add(option2);
    });
    
    // 同時更新回饋表單的車站選項
    updateFeedbackStationSelect();
}

/**
 * 顯示車站列表
 */
function displayStations(stations) {
    const tbody = document.getElementById('stationList');
    
    if (stations.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    <div class="empty-state">
                        <i class="bi bi-inbox"></i>
                        <p>目前沒有車站資料</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = stations.map(station => `
        <tr>
            <td><strong>${escapeHtml(station.code)}</strong></td>
            <td>${escapeHtml(station.name)}</td>
            <td>
                <span class="badge ${station.line === '紅線' ? 'bg-danger' : 'bg-warning text-dark'}">
                    ${escapeHtml(station.line)}
                </span>
            </td>
            <td>${station.address ? escapeHtml(station.address) : '<span class="text-muted">未設定</span>'}</td>
            <td>${formatDateTime(station.createdAt)}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editStation(${station.id})" title="編輯">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteStation(${station.id}, '${escapeHtml(station.name)}')" title="刪除">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

/**
 * 設定表單提交事件
 */
function setupFormSubmit() {
    const form = document.getElementById('stationForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const station = {
            code: document.getElementById('code').value.trim(),
            name: document.getElementById('name').value.trim(),
            line: document.getElementById('line').value,
            address: document.getElementById('address').value.trim() || null
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(station)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '新增車站失敗');
            }
            
            // 成功後重置表單並重新載入列表
            form.reset();
            showSuccess('車站新增成功！');
            loadStations();
        } catch (error) {
            console.error('新增車站錯誤:', error);
            showError(error.message || '新增車站失敗，請檢查輸入資料');
        }
    });
}

/**
 * 設定搜尋與篩選事件
 */
function setupSearchAndFilter() {
    const searchInput = document.getElementById('searchInput');
    const filterLine = document.getElementById('filterLine');
    const sortBy = document.getElementById('sortBy');
    
    // 搜尋事件
    searchInput.addEventListener('input', applyFilters);
    
    // 篩選事件
    filterLine.addEventListener('change', applyFilters);
    
    // 排序事件
    sortBy.addEventListener('change', applyFilters);
}

/**
 * 應用篩選與排序
 */
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const lineFilter = document.getElementById('filterLine').value;
    const sortBy = document.getElementById('sortBy').value;
    
    // 篩選
    let filtered = allStations.filter(station => {
        const matchSearch = !searchTerm || 
            station.code.toLowerCase().includes(searchTerm) ||
            station.name.toLowerCase().includes(searchTerm);
        const matchLine = !lineFilter || station.line === lineFilter;
        return matchSearch && matchLine;
    });
    
    // 排序
    filtered.sort((a, b) => {
        switch(sortBy) {
            case 'code':
                return a.code.localeCompare(b.code);
            case 'name':
                return a.name.localeCompare(b.name);
            case 'createdAt':
                return new Date(b.createdAt) - new Date(a.createdAt);
            default:
                return 0;
        }
    });
    
    displayStations(filtered);
}

/**
 * 編輯車站
 */
function editStation(id) {
    const station = allStations.find(s => s.id === id);
    if (!station) {
        showError('找不到車站資料');
        return;
    }
    
    // 填入表單
    document.getElementById('editId').value = station.id;
    document.getElementById('editCode').value = station.code;
    document.getElementById('editName').value = station.name;
    document.getElementById('editLine').value = station.line;
    document.getElementById('editAddress').value = station.address || '';
    
    // 顯示 Modal
    editModal.show();
}

/**
 * 儲存編輯
 */
async function saveEdit() {
    const id = document.getElementById('editId').value;
    const station = {
        code: document.getElementById('editCode').value.trim(),
        name: document.getElementById('editName').value.trim(),
        line: document.getElementById('editLine').value,
        address: document.getElementById('editAddress').value.trim() || null
    };
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(station)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || '更新車站失敗');
        }
        
        editModal.hide();
        showSuccess('車站更新成功！');
        loadStations();
    } catch (error) {
        console.error('更新車站錯誤:', error);
        showError(error.message || '更新車站失敗');
    }
}

/**
 * 刪除車站
 */
async function deleteStation(id, name) {
    if (!confirm(`確定要刪除車站「${name}」嗎？`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || '刪除車站失敗');
        }
        
        showSuccess('車站刪除成功！');
        loadStations();
    } catch (error) {
        console.error('刪除車站錯誤:', error);
        showError(error.message || '刪除車站失敗');
    }
}

/**
 * 路線規劃
 */
function planRoute() {
    const startId = parseInt(document.getElementById('startStation').value);
    const endId = parseInt(document.getElementById('endStation').value);
    
    if (!startId || !endId) {
        showError('請選擇起點站和終點站');
        return;
    }
    
    if (startId === endId) {
        showError('起點站和終點站不能相同');
        return;
    }
    
    const startStation = allStations.find(s => s.id === startId);
    const endStation = allStations.find(s => s.id === endId);
    
    if (!startStation || !endStation) {
        showError('找不到車站資料');
        return;
    }
    
    // 簡單的路線規劃邏輯
    const result = calculateRoute(startStation, endStation);
    displayRouteResult(result);
}

/**
 * 計算路線
 */
function calculateRoute(start, end) {
    const sameLine = start.line === end.line;
    
    // 取得同路線的所有車站並排序
    const lineStations = allStations
        .filter(s => s.line === start.line)
        .sort((a, b) => a.code.localeCompare(b.code));
    
    const startIndex = lineStations.findIndex(s => s.id === start.id);
    const endIndex = lineStations.findIndex(s => s.id === end.id);
    
    let stations = [];
    let distance = 0;
    let needTransfer = false;
    
    if (sameLine) {
        // 同路線
        if (startIndex < endIndex) {
            stations = lineStations.slice(startIndex, endIndex + 1);
        } else {
            stations = lineStations.slice(endIndex, startIndex + 1).reverse();
        }
        distance = Math.abs(endIndex - startIndex);
    } else {
        // 需要轉乘（簡化版：假設在第一個交會站轉乘）
        needTransfer = true;
        // 這裡簡化處理，實際應該找交會站
        stations = [start, end];
        distance = 2; // 簡化距離
    }
    
    return {
        stations,
        distance,
        needTransfer,
        estimatedTime: distance * 3, // 假設每站3分鐘
        startStation: start,
        endStation: end
    };
}

/**
 * 顯示路線規劃結果
 */
function displayRouteResult(result) {
    const resultDiv = document.getElementById('routeResult');
    const detailsDiv = document.getElementById('routeDetails');
    
    let html = `
        <div class="row g-3">
            <div class="col-md-6">
                <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-geo-alt-fill me-2"></i>
                    <strong>起點：</strong>
                    <span class="ms-2">${result.startStation.code} ${result.startStation.name}</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-geo-fill me-2"></i>
                    <strong>終點：</strong>
                    <span class="ms-2">${result.endStation.code} ${result.endStation.name}</span>
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex align-items-center mb-2">
                    <i class="bi bi-signpost me-2"></i>
                    <strong>經過站數：</strong>
                    <span class="ms-2">${result.distance} 站</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="bi bi-clock me-2"></i>
                    <strong>預估時間：</strong>
                    <span class="ms-2">${result.estimatedTime} 分鐘</span>
                </div>
            </div>
        </div>
    `;
    
    if (result.needTransfer) {
        html += `
            <div class="alert alert-warning mt-3 mb-0">
                <i class="bi bi-arrow-left-right"></i> 此路線需要轉乘
            </div>
        `;
    }
    
    if (result.stations.length > 2) {
        html += `
            <div class="mt-3">
                <strong class="d-block mb-2"><i class="bi bi-list-ol"></i> 經過站點：</strong>
                <div class="d-flex flex-wrap gap-2">
                    ${result.stations.map((s, i) => `
                        <span class="badge ${s.line === '紅線' ? 'bg-danger' : 'bg-warning text-dark'}">
                            ${i + 1}. ${s.code} ${s.name}
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    detailsDiv.innerHTML = html;
    resultDiv.style.display = 'block';
}

/**
 * 格式化日期時間
 */
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return date.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * 跳脫 HTML 特殊字元
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 顯示成功訊息
 */
function showSuccess(message) {
    showAlert(message, 'success');
}

/**
 * 顯示錯誤訊息
 */
function showError(message) {
    showAlert(message, 'danger');
}

/**
 * 顯示提示訊息
 */
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // 3 秒後自動移除
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Made with Bob - Enhanced Features

// ========== 乘客回饋功能 ==========

/**
 * 載入所有回饋
 */
async function loadAllFeedbacks() {
    try {
        const response = await fetch('/api/feedbacks');
        if (!response.ok) {
            throw new Error('載入回饋失敗');
        }
        const feedbacks = await response.json();
        displayFeedbacks(feedbacks);
    } catch (error) {
        console.error('載入回饋錯誤:', error);
        document.getElementById('feedbackList').innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="bi bi-exclamation-triangle" style="font-size: 2rem;"></i>
                <p class="mt-2">載入回饋資料失敗</p>
            </div>
        `;
    }
}

/**
 * 顯示回饋列表
 */
function displayFeedbacks(feedbacks) {
    const feedbackList = document.getElementById('feedbackList');
    
    if (feedbacks.length === 0) {
        feedbackList.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="bi bi-inbox" style="font-size: 2rem;"></i>
                <p class="mt-2">目前沒有回饋資料</p>
            </div>
        `;
        return;
    }
    
    // 按時間排序，最新的在前
    feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // 只顯示最新的 10 筆
    const recentFeedbacks = feedbacks.slice(0, 10);
    
    feedbackList.innerHTML = recentFeedbacks.map(feedback => {
        const stars = '⭐'.repeat(feedback.rating);
        const statusClass = getStatusClass(feedback.status);
        const statusText = feedback.status || '待處理';
        
        return `
            <div class="feedback-item rating-${feedback.rating}">
                <div class="feedback-header-info">
                    <div>
                        <strong>${escapeHtml(feedback.passengerName)}</strong>
                        <div class="feedback-meta">
                            <i class="bi bi-geo-alt"></i> ${feedback.station ? escapeHtml(feedback.station.name) : '未指定'}
                            <span class="ms-2"><i class="bi bi-clock"></i> ${formatDateTime(feedback.createdAt)}</span>
                        </div>
                    </div>
                    <div class="text-end">
                        <div class="feedback-rating">${stars}</div>
                    </div>
                </div>
                <p class="feedback-content-text">${escapeHtml(feedback.content)}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="feedback-category-badge">${escapeHtml(feedback.category)}</span>
                    <span class="feedback-status ${statusClass}">${statusText}</span>
                </div>
                ${feedback.response ? `
                    <div class="mt-2 p-2" style="background: rgba(52, 152, 219, 0.1); border-radius: 6px;">
                        <small><strong><i class="bi bi-reply-fill"></i> 管理員回覆：</strong></small>
                        <p class="mb-0 mt-1" style="font-size: 0.9rem;">${escapeHtml(feedback.response)}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

/**
 * 取得狀態樣式類別
 */
function getStatusClass(status) {
    switch(status) {
        case '待處理': return 'pending';
        case '處理中': return 'processing';
        case '已完成': return 'completed';
        default: return 'pending';
    }
}

/**
 * 更新回饋表單的車站選項
 */
function updateFeedbackStationSelect() {
    const select = document.getElementById('feedbackStation');
    
    // 清空現有選項
    select.innerHTML = '<option value="">請選擇車站</option>';
    
    // 按代碼排序
    const sortedStations = [...allStations].sort((a, b) => a.code.localeCompare(b.code));
    
    // 加入選項
    sortedStations.forEach(station => {
        const option = new Option(`${station.code} - ${station.name}`, station.id);
        select.add(option);
    });
}

/**
 * 設定回饋表單提交事件
 */
function setupFeedbackFormSubmit() {
    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const stationId = document.getElementById('feedbackStation').value;
        const feedback = {
            station: { id: parseInt(stationId) },
            passengerName: document.getElementById('passengerName').value.trim(),
            email: document.getElementById('passengerEmail').value.trim(),
            rating: parseInt(document.getElementById('feedbackRating').value),
            category: document.getElementById('feedbackCategory').value,
            content: document.getElementById('feedbackContent').value.trim()
        };
        
        // 驗證
        if (!stationId) {
            showError('請選擇車站');
            return;
        }
        
        if (feedback.content.length > 1000) {
            showError('回饋內容不能超過 1000 字');
            return;
        }
        
        try {
            const response = await fetch('/api/feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || '提交回饋失敗');
            }
            
            // 成功後重置表單並重新載入列表
            form.reset();
            showSuccess('感謝您的回饋！我們會盡快處理。');
            loadAllFeedbacks();
        } catch (error) {
            console.error('提交回饋錯誤:', error);
            showError(error.message || '提交回饋失敗，請稍後再試');
        }
    });
}

/**
 * 更新回饋統計
 */
async function updateFeedbackStats() {
    try {
        const response = await fetch('/api/feedbacks');
        if (response.ok) {
            const feedbacks = await response.json();
            document.getElementById('totalFeedbacks').textContent = feedbacks.length;
        }
    } catch (error) {
        console.error('更新回饋統計錯誤:', error);
    }
}
