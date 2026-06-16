-- 捷運系統車站初始資料
-- 紅線和橘線的主要車站（含詳細資訊）

-- 紅線 (Red Line)
INSERT INTO station (code, name, line, address, latitude, longitude, exit_count, has_elevator, has_escalator, has_restroom, first_train_time, last_train_time, daily_passengers, created_at) VALUES
('RK1', '岡山車站', '紅線', '高雄市岡山區岡山路115號', 22.7967, 120.2937, 4, true, true, true, '06:00', '23:30', 8500, CURRENT_TIMESTAMP),
('R24', '岡山醫院', '紅線', '高雄市岡山區壽天路', 22.7856, 120.2889, 2, true, true, false, '06:00', '23:30', 3200, CURRENT_TIMESTAMP),
('R23', '橋頭火車站', '紅線', '高雄市橋頭區站前街', 22.7589, 120.3056, 3, true, true, true, '06:00', '23:30', 5600, CURRENT_TIMESTAMP),
('R22A', '橋頭糖廠', '紅線', '高雄市橋頭區糖廠路', 22.7534, 120.3123, 2, true, false, false, '06:00', '23:30', 2800, CURRENT_TIMESTAMP),
('R22', '青埔', '紅線', '高雄市橋頭區經武路', 22.7445, 120.3178, 2, true, true, false, '06:00', '23:30', 3100, CURRENT_TIMESTAMP),
('R21', '都會公園', '紅線', '高雄市楠梓區高楠公路', 22.7334, 120.3234, 2, true, true, true, '06:00', '23:30', 4200, CURRENT_TIMESTAMP),
('R20', '後勁', '紅線', '高雄市楠梓區加昌路', 22.7223, 120.3156, 3, true, true, false, '06:00', '23:30', 6800, CURRENT_TIMESTAMP),
('R19', '楠梓科技園區', '紅線', '高雄市楠梓區德民路', 22.7156, 120.3089, 2, true, true, false, '06:00', '23:30', 5400, CURRENT_TIMESTAMP),
('R18', '油廠國小', '紅線', '高雄市楠梓區左楠路', 22.7089, 120.3023, 2, true, false, false, '06:00', '23:30', 3600, CURRENT_TIMESTAMP),
('R17', '世運', '紅線', '高雄市楠梓區左楠路', 22.7023, 120.2967, 4, true, true, true, '06:00', '23:30', 7200, CURRENT_TIMESTAMP),
('R16', '左營（高鐵）', '紅線', '高雄市左營區高鐵路', 22.6878, 120.3067, 6, true, true, true, '05:50', '00:00', 28500, CURRENT_TIMESTAMP),
('R15', '生態園區', '紅線', '高雄市左營區博愛三路', 22.6789, 120.3023, 2, true, true, false, '06:00', '23:30', 4800, CURRENT_TIMESTAMP),
('R14', '巨蛋', '紅線', '高雄市左營區博愛二路', 22.6712, 120.3012, 4, true, true, true, '06:00', '23:30', 12600, CURRENT_TIMESTAMP),
('R13', '凹子底', '紅線', '高雄市鼓山區博愛一路', 22.6634, 120.3001, 3, true, true, false, '06:00', '23:30', 8900, CURRENT_TIMESTAMP),
('R12', '後驛', '紅線', '高雄市三民區博愛一路', 22.6556, 120.3023, 4, true, true, true, '06:00', '23:30', 11200, CURRENT_TIMESTAMP),
('R11', '中央車站', '紅線', '高雄市三民區建國二路', 22.6478, 120.3045, 8, true, true, true, '05:50', '00:00', 35600, CURRENT_TIMESTAMP),
('R9', '中央公園', '紅線', '高雄市前金區中山一路', 22.6389, 120.3012, 4, true, true, true, '06:00', '23:30', 15800, CURRENT_TIMESTAMP),
('R8', '三多商圈', '紅線', '高雄市苓雅區三多三路', 22.6312, 120.3089, 6, true, true, true, '06:00', '23:30', 22400, CURRENT_TIMESTAMP),
('R7', '獅甲', '紅線', '高雄市前鎮區中山三路', 22.6234, 120.3123, 2, true, true, false, '06:00', '23:30', 6200, CURRENT_TIMESTAMP),
('R6', '凱旋', '紅線', '高雄市前鎮區中山三路', 22.6156, 120.3156, 4, true, true, true, '06:00', '23:30', 9800, CURRENT_TIMESTAMP),
('R5', '前鎮高中', '紅線', '高雄市前鎮區翠亨北路', 22.6078, 120.3189, 2, true, true, false, '06:00', '23:30', 5600, CURRENT_TIMESTAMP),
('R4A', '草衙', '紅線', '高雄市前鎮區中安路', 22.5989, 120.3223, 2, true, false, false, '06:00', '23:30', 4200, CURRENT_TIMESTAMP),
('R4', '國際機場', '紅線', '高雄市小港區中山四路', 22.5912, 120.3256, 4, true, true, true, '06:00', '23:30', 8900, CURRENT_TIMESTAMP),
('R3', '小港', '紅線', '高雄市小港區沿海一路', 22.5834, 120.3289, 3, true, true, true, '06:00', '23:30', 7400, CURRENT_TIMESTAMP),

-- 橘線 (Orange Line)
('OT1', '大寮', '橘線', '高雄市大寮區捷西路', 22.6123, 120.3956, 2, true, true, false, '06:00', '23:30', 4800, CURRENT_TIMESTAMP),
('O14', '鳳山國中', '橘線', '高雄市鳳山區光遠路', 22.6089, 120.3789, 2, true, true, false, '06:00', '23:30', 5200, CURRENT_TIMESTAMP),
('O13', '大東', '橘線', '高雄市鳳山區光遠路', 22.6056, 120.3623, 3, true, true, true, '06:00', '23:30', 8600, CURRENT_TIMESTAMP),
('O12', '鳳山', '橘線', '高雄市鳳山區光遠路', 22.6023, 120.3456, 4, true, true, true, '06:00', '23:30', 12400, CURRENT_TIMESTAMP),
('O11', '鳳山西站 (市議會)', '橘線', '高雄市鳳山區國泰路', 22.5989, 120.3289, 2, true, true, false, '06:00', '23:30', 6800, CURRENT_TIMESTAMP),
('O10', '衛武營', '橘線', '高雄市苓雅區中正一路', 22.6234, 120.3389, 4, true, true, true, '06:00', '23:30', 11200, CURRENT_TIMESTAMP),
('O9', '苓雅運動園區', '橘線', '高雄市苓雅區中正二路', 22.6267, 120.3323, 2, true, true, false, '06:00', '23:30', 5600, CURRENT_TIMESTAMP),
('O8', '五塊厝', '橘線', '高雄市苓雅區中正二路', 22.6301, 120.3256, 3, true, true, true, '06:00', '23:30', 8200, CURRENT_TIMESTAMP),
('O7', '文化中心', '橘線', '高雄市苓雅區五福一路', 22.6334, 120.3189, 4, true, true, true, '06:00', '23:30', 14600, CURRENT_TIMESTAMP),
('O6', '信義國小', '橘線', '高雄市新興區中正三路', 22.6367, 120.3123, 2, true, true, false, '06:00', '23:30', 6400, CURRENT_TIMESTAMP),
('O4', '前金', '橘線', '高雄市前金區中正四路', 22.6401, 120.3056, 3, true, true, true, '06:00', '23:30', 9800, CURRENT_TIMESTAMP),
('O2', '鹽埕埔', '橘線', '高雄市鹽埕區大勇路', 22.6434, 120.2989, 4, true, true, true, '06:00', '23:30', 11800, CURRENT_TIMESTAMP),
('O1', '哈瑪星', '橘線', '高雄市鼓山區臨海二路', 22.6467, 120.2923, 3, true, true, true, '06:00', '23:30', 8400, CURRENT_TIMESTAMP);

-- Made with Bob - Enhanced Data
