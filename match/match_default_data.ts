export const match_list_json = `{
    "code": 1,
    "data": {
        "ad": {
            "img": "",
            "href": ""
        },
        "match_list": [
            [
                {
                    "id": 44,
                    "team1_color": "rgba(202, 21, 29, 1)",
                    "team1_id": 42,
                    "team1_logo": "https://fcscdn3.k4n.cc/upload/a30/png/2024229/1.png",
                    "team1_name": "成都蓉城",
                    "team2_color": "rgba(28, 45, 103, 1)",
                    "team2_id": 50,
                    "team2_logo": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3714174967,1210934582&fm=58&app=10&f=PNG?w=100&h=100&s=0300F804576004A21680299903001096",
                    "team2_name": "梅州客家",
                    "time_e": 1727616900,
                    "time_s": 1727609700,
                    "sale": 1,
                    "line_s_time": 1727416800,
                    "line_e_time": 1726292100
                }
            ]
        ]
    },
    "msg": "success",
    "page": {
        "count": 1,
        "currentPage": 1,
        "pageSize": 6
    }
}`;

export const match_info_json = (lid2: string, match_id: string) => `
{
  "code": 1,
  "data": {
    "id": 44,
    "team1_name": "成都蓉城",
    "team1_logo": "https://fcscdn3.k4n.cc/upload/a30/png/2024229/1.png",
    "team1_color": "rgba(202, 21, 29, 1)",
    "team2_name": "天津津门虎",
    "team2_logo": "https://fcscdn3.k4n.cc/upload/a30/png/202474/天津津门虎.png",
    "team2_color": "rgba(9, 76, 151, 1)",
    "time_s": 1740911400,
    "time_e": 1740918600,
    "title": "2025华润饮料中超联赛第2轮",
    "imgs": {
      "1": "https://fcscdn3.k4n.cc/upload/a11/jpeg/2025225/25赛季第二轮轮播图1.jpg",
      "2": "https://fcscdn3.k4n.cc/upload/a11/jpeg/2025225/25赛季第二轮轮播图2.jpg",
      "3": "",
      "4": ""
    },
    "address": "四川省成都市金牛区北星大道一段4228号",
    "address_name": "凤凰山体育公园",
    "address_lat": 30.7659798,
    "address_lng": 104.0774612,
    "sold_s_time": 1740722400,
    "sold_e_time": 1740889800,
    "refund_e_time": 1740889800000,
    "in_e_time": 1740918600,
    "in_s_time": 1740892200,
    "status": 1,
    "line_s_time": 1740672000,
    "line_e_time": 1740889800,
    "need_real_name": true,
    "refund": true,
    "max_num": 2,
    "bgimg": "",
    "stadium_id": 1,
    "team1_id": 42,
    "team2_id": 46,
    "sale": 1,
    "sold_times": [
      1740722400000,
      1740889800000
    ],
    "line_times": [
      1740672000000,
      1740889800000
    ],
    "in_times": [
      1740892200000,
      1740918600000
    ],
    "match_times": [
      1740911400000,
      1740918600000
    ],
    "text": "<p><img src=\\"https://fcscdn3.k4n.cc/upload/a11/jpeg/2025226/25赛季第二轮售票通知-定稿.jpg\\" style=\\"width: 100%;\\"/></p>",
    "notice": [
      4,
      6,
      7,
      11,
      12,
      14,
      15,
      16,
      19
    ],
    "notices": [
      {
        "id": 4,
        "create_time": "2022-08-25 17:02:02",
        "name": "实名认证",
        "is_show": true,
        "rank": 5,
        "text": "本场比赛 ${match_id}, 用户 ${lid2} 本赛季采取强实名政策，购票采用实名制，凭本人身份证原件（必备）人脸识别入场。同一证件仅能对应一张门票，请球迷朋友们在购买前完成实名认证。如入场观赛者身份与所持球票身份信息不符，工作人员有权拒绝其入场并保留追究相关法律责任的权利。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 6,
        "create_time": "2022-08-29 11:20:25",
        "name": "退票规则",
        "is_show": true,
        "rank": 4,
        "text": "1、比赛日前退票，即比赛日00:00前，此阶段退票将收取球票价格的【10%】作为手续费；\\n2、比赛日当日退票，即比赛日00:00-08:30，此阶段退票将收取球票价格的【20%】作为手续费；\\n3、开赛前7小时后不再办理退票。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 7,
        "create_time": "2022-08-29 11:20:42",
        "name": "限购规则",
        "is_show": true,
        "rank": 2,
        "text": "每场比赛每人限购2张，一人一证，一票一座，入场后请按区域对号入座。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 11,
        "create_time": "2022-12-25 12:35:37",
        "name": "儿童政策",
        "is_show": true,
        "rank": 3,
        "text": "六周岁及以上购票入场。六周岁以下儿童可凭身份证原件或户口簿在成年观众陪同下，带领1名儿童不占座席免票入场。(2019年1月1日当日及之后出生儿童免票)",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 12,
        "create_time": "2023-04-19 11:02:59",
        "name": "购票渠道",
        "is_show": true,
        "rank": 1,
        "text": "微信小程序<成都蓉城足球俱乐部> 线上购票的唯一官方渠道。线上售票不兑换实体票。若在非官方渠道购票出现问题，由购票者自行承担相关责任。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 14,
        "create_time": "2023-05-04 13:30:00",
        "name": "观赛须知",
        "is_show": true,
        "rank": 9,
        "text": "请入场观众务必遵守对号入座的赛场秩序管理规定，文明观赛，理性对待输赢；服从现场民警及工作人员指挥，场内严禁抽烟、严禁踩踏座椅、严禁投掷物品、严禁翻越隔离设施；严禁穿着印有侮辱性标语的服饰，严禁携带印有侮辱性标语的横幅、海报等展示道具。\\n1、残疾人随身携带的、必备的轮椅、拐杖、助行架、盲杖、假肢、矫形器等残疾人辅助器具，残疾人随身携带的、必备的、少量的急救药品和必需的医用注射器、消毒液、润滑液、导尿管、集尿器乘坐轮椅的残疾人随身携带的、必备的轮椅维修工具等不列入禁限带物品清单；2、个人使用的、少量的消毒凝胶(不超过100ml)和酒精棉片准予带入；3、观众应遵守《持票须知》中有关禁限带物品以及限制行为的要求，此外，不得穿戴带有明显商业展示的或带有侮辱性物品或者服装。\\n",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 15,
        "create_time": "2023-05-12 11:43:13",
        "name": "检票须知",
        "is_show": true,
        "rank": 6,
        "text": "提前2小时30分钟检票，比赛开始30分钟后仅保留3条检票通道，下半场开始15分钟后，关闭所有检票通道，并进行疏散准备工作。VIP、包厢等区域观赛人请从2号检票区旁的VIP检票区入场。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 16,
        "create_time": "2024-02-29 11:04:48",
        "name": "入场规则",
        "is_show": true,
        "rank": 7,
        "text": "入场规则：观赛人须携带本人身份证原件，进入场馆时需验证本人身份证件，同时进行人脸识别，通过后方可入行观赛。如果观赛人在购票过程中所填信息有误，导致无法入场或以上任意信息不匹配造成入场失败，需自行承担责任。请各位观众合理安排，出场后无法重新入场，每位观众仅限一次入场机会。\\n1、 观赛区域在首层看台或顶层看台的球迷请持本人身份证原件由凤凰山体育公园1号检票区、2号检票区或3号检票区，经人脸识别验证本人身份后，过安检进入场馆，凭小票进入相应区域看台，对号入座。\\n2、 观赛区域在VIP或包厢的球迷请持本人身份证原件由凤凰山体育公园的VIP检票区，经人脸识别验证本人身份后，过安检进入场馆，并乘坐电梯进入相应看台区域，对号入座。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      },
      {
        "id": 19,
        "create_time": "2024-02-29 11:21:42",
        "name": "安检须知",
        "is_show": true,
        "rank": 8,
        "text": "为维护场馆秩序，方便您和他人安全、愉快地观看比赛，请注意不要携带禁限带物品，以免在安检时耽误您的宝贵时间。依据中国法律法规，安保人员将对以下禁带物品予以收缴，并对相关人员进行处罚：1、枪支、弹药、爆炸物品；2、仿真枪及弩、匕首等管制器具；3、烟花爆竹、汽油、酒精等易燃易爆危险物品；4、剧毒、腐蚀性等危险化学品及放射性物品；5、有害生物制剂、传染病病原体等危险物质；6、海洛因、可卡因、大麻、冰毒等各类毒品；7、中国法律法规明令禁止的其他物品。\\n以下为限带物品，如携带，安保人员将要求携带人把限带物品丢弃在容器中或自行处理(安检点设有可供观众丢弃限带物品的容器和贵重物品储物柜)，安检人员不负责保管：1、打火机、火柴等点火器具；2、易碎品与各类容器，例如玻璃瓶/杯、保温杯、冰盒、奶瓶；3、自带的食品及各类软、硬包装饮料，矿泉水，特别是含酒精饮料；4、由非官方赞助商和非合作伙伴公司为商业目的推广和销售的任何物品；5、带有政治、种族、宗教、商业和违反中华人民共和国法律法规的横幅、标语以及其他用于宣传的物品及着装；6、充电宝、扇子、小风扇、电动滑板车、自行车、小型摩托车、平衡车、踏板车、滑板、旱冰鞋和其他交通工具(婴儿车、轮椅、移动辅助工具和俱乐部允许的交通工具除外)；7、动物(导盲犬、缉毒犬和炸弹嗅探犬等工作犬除外)；8、乐器，包括但不限于哨子、乌祖拉拉等（提前和俱乐部申报的物品除外）；9、球棒、长棍、尖锐物等易造成人身伤害的物品，包括但不限于长柄雨伞、尖头伞等(肢残人士使用的拐杖除外)；10、弓、球、球拍、球杆、棍棒、飞盘及其他类似物品；11、体积较大，超过50X50X50厘米的袋子或箱包；12、未提前向俱乐部申报的旗帜、旗杆；13、未经授权的专业摄像设备及用于照相机与摄像机的支架、三脚架、自拍杆；14、分散运动员、技术官员、教练员注意力，干扰赛事的电子信号、集群信号、影响赛事进行或妨碍他人观赛的未经授权物品,包括但不限于激光笔、收音机、口哨、喇叭、遥控玩具及扩音设备等；15、载人气球、无人机、航空模型、无人驾驶自由气球、系留气球、动力伞等“低慢小”航空器和空飘物及其飞行控制、桨叶等重要零部件，风筝、孔明灯等空飘物；16、未经授权的无线电子设备和其他干扰广播信号的物品；17、中国法律法规明令禁止的其他物品，以及俱乐部认为对比赛或设施有破坏性或危险性、对赛事正常举办造成不良影响的任何物品。",
        "read_num": 0,
        "icon": "info-circle",
        "name_color": "#000000",
        "text_color": "#999999",
        "icon_color": "#FB3777"
      }
    ],
    "btn_status": 0,
    "btn_text": "加载中",
    "on": true,
    "commonProblem": [
      {
        "id": 15,
        "create_time": "2023-05-11 13:06:37",
        "update_time": "2025-02-22 13:38:46",
        "name": "如何索取发票",
        "rank": 100,
        "read_num": 4525,
        "is_show": true
      },
      {
        "id": 11,
        "create_time": "2023-04-19 11:13:21",
        "update_time": "2025-02-22 13:38:43",
        "name": "如何查看购票信息",
        "rank": 100,
        "read_num": 15631,
        "is_show": true
      },
      {
        "id": 6,
        "create_time": "2023-04-17 07:54:45",
        "update_time": "2025-02-22 13:38:37",
        "name": "港澳台及外国友人购票及验票方式",
        "rank": 100,
        "read_num": 7960,
        "is_show": true
      }
    ],
    "protocol": {
      "is_read": true,
      "text": "<p style=\\"line-height: 30px; margin-bottom: 10px; text-align: center; font-size: 14px; font-weight: bold; color: rgb(51, 51, 51); font-family: &quot;Microsoft YaHei&quot;; white-space: normal;\\"><span style=\\"font-size: 20px;\\">【购票须知】</span></p><p>&nbsp; &nbsp;&nbsp;</p><p><strong><span style=\\"font-family: 宋体;\\">一、</span></strong><span style=\\"font-family: 宋体;\\"><strong>购票渠道</strong>：微信小程序</span><strong><span style=\\"color: rgb(255, 0, 0);\\">&lt;<span style=\\"font-family: 宋体;\\">成都蓉城足球俱乐部</span>&gt; </span></strong><span style=\\"font-family: 宋体;\\">线上购票的唯一官方渠道。线上售票不兑换实体票。若在非官方渠道购票出现问题，由购票者自行承担相关责任。</span></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">二、</span></strong><span style=\\"font-family:宋体\\"><strong>限购规则</strong>：</span><span style=\\"color: rgb(255, 0, 0);\\"><strong><span style=\\"font-family: 宋体;\\">每场比赛每人</span></strong></span><strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">限购</span><span style=\\"color: rgb(255, 0, 0);\\">2<span style=\\"font-family: 宋体;\\">张</span></span></strong><span style=\\"font-family:宋体\\">，一人一证，一票一座，入场后请按区域对号入座。</span><span style=\\"font-family: 宋体;\\">(104区、112区、530区、532区、534区均有摆放机位)视觉上会有不同程度的遮挡，可能会影响您的观赛效果。建议您在购票前仔细查看座位图，以便选择一个视野开阔、无遮挡的座位，</span><span style=\\"font-family: 宋体;\\">(107区、109区、114区、115区、119区、120区、121区、122区、508区、511区、512区)有球迷组织助威观赛，球迷组织区域有站立、摇旗呐喊等观赛助威形式，会对周边球迷家人们观赛视线造成影响，请期望在上述球迷组织区域周边购票的球迷家人们综合考虑，避免影响现场观赛感受和效果</span>。</p><p><br/></p><p><strong><span style=\\"font-family:宋体\\">三、</span></strong><span style=\\"font-family:宋体\\"><strong>儿童政策</strong>：<strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">六周岁及以上购票入场</span></strong>。六周岁以下儿童可凭身份证原件或户口簿在成年观众陪同下，带领</span>1<span style=\\"font-family:宋体\\">名儿童不占座席免票入场。</span><span style=\\"font-family:宋体\\">(2019年1月1日当日及之后出生儿童免票）</span><span style=\\"font-family:宋体\\">。</span></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">四、</span></strong><span style=\\"font-family:宋体\\"><strong>退票规则</strong>：<strong>比赛日前退票</strong>，即比赛日00:00前，此阶段退票将收取球票价格的<strong>【10%】作为手续费</strong>；<strong>比赛日当日退票</strong>，即比赛日00:00-08:30，此阶段退票将收取球票价格的<strong>【20%】作为手续费</strong>；<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>开赛前7小时后不再办理退票</strong></span>。</span></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">五、</span></strong><span style=\\"font-family:宋体\\"><strong>实名认证</strong>：<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>本赛季采取强实名政策，购票采用实名制，凭本人身份证原件（必备）人脸识别入场。</strong></span>同一证件仅能对应一张门票，请球迷朋友们在购买前完成实名认证。<span style=\\"font-family: 宋体; color: rgb(0, 0, 0);\\"><strong><span style=\\"font-family: 宋体;\\">如入场观赛者身份与所持球票身份信息不符，工作人员有权拒绝其入场并保留追究相关法律责任的权利。</span></strong></span></span></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">六、</span></strong><span style=\\"font-family:宋体\\"><strong>检票须知</strong>：</span><strong><span style=\\"color: rgb(255, 0, 0);\\"><span style=\\"font-family: 宋体;\\">提前</span>2<span style=\\"font-family: 宋体;\\">小时</span></span></strong><strong><span style=\\"color: rgb(255, 0, 0);\\"><span style=\\"font-family: 宋体;\\">30</span></span></strong><strong><span style=\\"color: rgb(255, 0, 0);\\"><span style=\\"font-family: 宋体;\\">分钟检票，比赛开始</span>30<span style=\\"font-family: 宋体;\\">分钟后仅保留</span>3<span style=\\"font-family: 宋体;\\">条检票通道，</span></span></strong><span style=\\"color: rgb(255, 0, 0);\\"><span style=\\"font-family: 宋体;\\"></span><strong><span style=\\"font-family: 宋体;\\">下半场开始</span>15<span style=\\"font-family: 宋体;\\">分钟后，关闭所有检票通道</span></strong></span><span style=\\"font-family:宋体\\">，并进行疏散准备工作。</span><strong>VIP<span style=\\"font-family:宋体\\">、包厢等区域观赛人请从</span>2<span style=\\"font-family:宋体\\">号检票区旁的</span>VIP<span style=\\"font-family:宋体\\">检票区入场。</span></strong></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">七、</span></strong><span style=\\"font-family:宋体\\"><strong>入场规则</strong>：观赛人须携带<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>本人身份证原件</strong></span>，进入场馆时需验证本人身份证件，同时进行人脸识别，通过后方可入行观赛。如果观赛人在购票过程中所填信息有误，导致无法入场或以上任意信息不匹配造成入场失败，需自行承担责任。请各位观众合理安排，出场后无法重新入场，每位观众<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>仅限一次入场机会</strong></span>。</span></p><p><span style=\\"font-family:宋体\\"></span></p><p><span style=\\"font-family:宋体\\">1、<strong>观赛区域在</strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>首层看台或顶层看台</strong></span><strong>的球迷请持本<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"></span>人身份证原件</strong>由凤凰山体育公园<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>1号检票区、2号检票区或3号检票区</strong></span>，<strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">经人脸识别验证本人身份后</span></strong>，过安检进入场馆，<strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">凭小票进入相应区域看台，对号入座</span></strong>。</span></p><p><span style=\\"font-family:宋体\\">2、<strong>观赛区域在<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">VIP或包厢</span>的球迷请持本人身份证原件</strong>由凤凰山体育公园的<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>VIP检票区</strong></span>，经人脸识别验证本人身份后，过安检进入场馆，并乘坐电梯进入相应看台区域，对号入座。</span></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">八、</span></strong><span style=\\"font-family:宋体\\"><strong>安检须知</strong>：为维护场馆秩序，方便您和他人安全、愉快地观看比赛，<strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">请注意</span><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">不要携带禁限带物品</span></strong>，以免在安检时耽误您的宝贵时间。依据中国法律法规，安保人员将对以下禁带物品予以收缴，并对相关人员进行处罚：</span>1、<span style=\\"font-family:宋体\\">枪支、弹药、爆炸物品；</span>2、<span style=\\"font-family:宋体\\">仿真枪及弩、匕首等管制器具；</span>3、<span style=\\"font-family:宋体\\">烟花爆竹、汽油、酒精等易燃易爆危险物品；</span>4、<span style=\\"font-family:宋体\\">剧毒、腐蚀性等危险化学品及放射性物品；</span>5、<span style=\\"font-family:宋体\\">有害生物制剂、传染病病原体等危险物质；</span>6、<span style=\\"font-family:宋体\\">海洛因、可卡因、大麻、冰毒等各类毒品；</span>7.<span style=\\"font-family:宋体\\">中国法律法规明令禁止的其他物品。</span></p><p style=\\"text-indent:28px\\"><span style=\\"font-family:宋体\\">以下为<strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">限带物品</span></strong>，如携带，安保人员将要求携带人把限带物品丢弃在容器中或自行处理</span>(<span style=\\"font-family:宋体\\">安检点设有可供观众丢弃限带物品的容器和贵重物品储物柜</span>)<span style=\\"font-family:宋体\\">，<span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\"><strong>安检人员不负责保管</strong></span>：</span>1、<span style=\\"font-family:宋体\\">打火机、火柴等点火器具；</span>2、<span style=\\"font-family:宋体\\">易碎品与各类容器，例如玻璃瓶</span>/<span style=\\"font-family:宋体\\">杯、保温杯、冰盒、奶瓶；</span>3、<span style=\\"font-family:宋体\\">自带的食品及各类软、硬包装饮料，矿泉水，特别是含酒精饮料；</span>4、<span style=\\"font-family:宋体\\">由非官方赞助商和非合作伙伴公司为商业目的推广和销售的任何物品；</span>5、<span style=\\"font-family:宋体\\">带有政治、种族、宗教、商业和违反中华人民共和国法律法规的横幅、标语以及其他用于宣传的物品及着装；</span>6、<span style=\\"font-family:宋体\\">充电宝、扇子、小风扇、电动滑板车、自行车、小型摩托车、平衡车、踏板车、滑板、旱冰鞋和其他交通工具</span>(<span style=\\"font-family:宋体\\">婴儿车、轮椅、移动辅助工具和俱乐部允许的交通工具除外</span>)&nbsp;<span style=\\"font-family: 宋体; text-indent: 28px; text-wrap: wrap;\\">；</span>7、<span style=\\"font-family:宋体\\">动物</span>(<span style=\\"font-family:宋体\\">导盲犬、缉毒犬和炸弹嗅探犬等工作犬除外</span>)<span style=\\"font-family:宋体\\">；</span>8、<span style=\\"font-family:宋体\\">乐器，包括但不限于哨子、乌祖拉拉等（提前和俱乐部申报的物品除外）；</span>9、<span style=\\"font-family:宋体\\">球棒、长棍、尖锐物等易造成人身伤害的物品，包括但不限于长柄雨伞、尖头伞等</span>(<span style=\\"font-family:宋体\\">肢残人士使用的拐杖除外</span>)；10、<span style=\\"font-family:宋体\\">弓、球、球拍、球杆、棍棒、飞盘及其他类似物品；</span>11、<span style=\\"font-family:宋体\\">体积较大，超过</span>50X50X50<span style=\\"font-family:宋体\\">厘米的袋子或箱包；</span>12、<span style=\\"font-family:宋体\\">未提前向俱乐部申报的旗帜，旗杆；</span>13、<span style=\\"font-family:宋体\\">未经授权的专业摄像设备及用于照相机与摄像机的支架、三脚架、自拍杆；</span>14、<span style=\\"font-family:宋体\\">分散运动员、技术官员、教练员注意力，干扰赛事的电子信号、集群信号、影响赛事进行或妨碍他人观赛的未经授权物品</span>，<span style=\\"font-family:宋体\\">包括但不限于激光笔、收音机、口哨、喇叭、遥控玩具及扩音设备等；</span>15、<span style=\\"font-family:宋体\\">载人气球、无人机、航空模型、无人驾驶自由气球、系留气球</span>、<span style=\\"font-family:宋体\\">动力伞等</span>“<span style=\\"font-family:宋体\\">低慢小</span>”<span style=\\"font-family:宋体\\">航空器和空飘物及其飞行控制、桨叶等重要零部件</span>，<span style=\\"font-family:宋体\\">风筝、孔明灯等空飘物；</span>16、<span style=\\"font-family:宋体\\">未经授权的无线电子设备和其他干扰广播信号的物品；</span>17、<span style=\\"font-family:宋体\\">中国法律法规明令禁止的其他物品，以及俱乐部认为对比赛或设施有破坏性或危险性、对赛事正常举办造成不良影响的任何物品。</span></p><p>&nbsp;</p><p><strong><span style=\\"font-family:宋体\\">九、</span></strong><span style=\\"font-family:宋体\\"><strong>观赛须知</strong>：</span> <span style=\\"font-family:宋体\\">请入场观众务必<strong><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">遵守对号入座</span><span style=\\"font-family: 宋体; color: rgb(255, 0, 0);\\">的赛场秩序管理规定</span></strong>，<strong>文明观赛，理性对待输赢</strong>；服从现场民警及工作人员指挥，场内严禁抽烟、严禁踩踏座椅、严禁投掷物品、严禁翻越隔离设施；严禁穿着印有侮辱性标语的服饰，严禁携带印有侮辱性标语的横幅、海报等展示道具。</span></p><p>&nbsp;&nbsp;&nbsp; 1、<span style=\\"font-family:宋体\\">残疾人随身携带的、必备的轮椅、拐杖、助行架、盲杖、假肢、矫形器等残疾人辅助器具，残疾人随身携带的、必备的、少量的急救药品和必需的医用注射器、消毒液、润滑液、导尿管、集尿器乘坐轮椅的残疾人随身携带的、必备的轮椅维修工具等不列入禁限带物品清单；</span>2、<span style=\\"font-family:宋体\\">个人使用的、少量的消毒凝胶</span>(<span style=\\"font-family:宋体\\">不超过</span>100ml)<span style=\\"font-family:宋体\\">和酒精棉片准予带入；</span>3、<span style=\\"font-family:宋体\\">观众应遵守《持票须知》中有关禁限带物品以及限制行为的要求，此外，不得穿戴带有明显商业展示的或带有侮辱性物品或者服装。</span></p><p>&nbsp;</p><p>&nbsp; &nbsp; &nbsp; <span style=\\"color: rgb(255, 0, 0);\\"><strong>购买、持有或使用门票的观众均被认为已阅读并接受以上条款。</strong></span></p>",
      "title": "购票须知",
      "hint": "（一） <成都蓉城足球俱乐部> 小程序是线上购票的唯一官方渠道。\\n（二）限购规则：每笔订单最多购买1张。\\n（三）退/还票规则：每场比赛开场前4小时内不允许退还。\\n（四）实名认证：每张票需要进行实名认证后生效。\\n（五）赠票：由俱乐部官方通过导出“电子票二维码”进行赠票分发。\\n（六）半价票：学生凭借学生证到现场完成购票后领取入场凭证进入。\\n（七）免票：军人、残疾人、老人、医护人员免票（凭证件）到现场领取入场凭证进入。\\n（八）除半价票/免票外，所有观赛票均通过“二维码电子票”检票入场。\\n（九）未购票人员在现场可通过操作指示或工作人员引导进行线上购票。\\n（十）请勿将电子票截屏转发给他人，引发问题票后果自负。",
      "maxBuyNum": 1,
      "orderTip": "1.微信小程序<成都蓉城足球俱乐部>线上购票的唯一官方渠道。\\n2.限购规则:每场比赛每人限购2张，一人一证，一票-座，入场后请按区域对号入座，\\n3.(104区、112区、530区、532区、534区均有摆放机位)视觉上会有不同程度的遮挡，可能会影响您的观赛效果。建议您在购票前仔细查看座位图，以便选择一个视野开阔、无遮挡的座位，\\n4.(107区、109区、114区、115区、119区、120区、121区、122区、508区、511区、512区)有球迷组织助威观赛，球迷组织区域有站立、摇旗呐喊等观赛助威形式，会对周边球迷家人们观赛视线造成影响，请期望在上述球迷组织区域周边购票的球迷家人们综合考虑，避免影响现场观赛感受和效果。\\n5.儿童政策:六周岁及以上购票入场。六周岁以下儿童可凭身份证原件或户口簿在成年观众陪同下，带领1名儿童不占座席免票入场。(2019年1月1日当日及之后出生儿童免票)\\n6.退票规则:(1)比赛日前退票，即比赛日00:00前，此阶段退票将收取球票价格的【10%】作为手续费;(2)比赛日当日退票，即比赛日00:00-12:35，此阶段退票将收取球票价格的【20%】作为手续费;(3)开赛前7小时后不再办理退票。\\n7.实名认证:本赛季采用强实名政策，购票采用实名制，凭本人身份证原件(必备)人脸识别入场。同一证件仅能对应一张门票，请球迷家人们在购买前完成实名认证。如入场观赛者身份与所持球票身份信息不符，工作人员有权拒绝其入场并保留追究相关法律责任的权利。同时为了确保小球迷们在检票入场时更顺畅、更便捷，减少入场等候时间，我们建议尚未为小球迷办理身份证的球迷朋友们，尽快为小球迷们办理身份证。\\n8.检票:提前2小时30分钟检票，比赛开始30分钟后仅保留3条检票通道，下半场开始15分钟后，关闭所有检票通道，并进行疏散准备工作。VIP、包厢等区域观赛人请从2号检票区旁的VIP检票区入场。\\n9.入场规则:观赛人须携带本人身份证原件，进入场馆时需验证本人身份证件，同时进行人脸识别，通过后方可入行观赛。如果观赛人在购票过程中所填信息有误，导致无法入场或以上任意信息不匹配造成入场失败，需自行承担责任。请各位观众合理安排，出场后无法重新入场，每位观众仅限一次入场机会。\\n10.入场时严禁携带旗杆、观赛团体及个人不得携带未经报备的标语、条幅等物料、呜鸣祖拉小喇叭、各种瓶装或软、硬包装饮用水(饮料)、水杯、充电宝、雨伞、婴儿奶瓶、硬币、打火机、冷烟花、方便食品、激光用具(含激光笔)、大型设备、管制刀具等坚硬、尖锐物体以及易燃易爆的物品入场，其他禁止携带物品详见《2025中超足球赛事观众禁限带物品须知》。所有限带物品请提前放置储物柜，安检口不负责保管\\n11.请入场观众务必遵守对号入座的赛场秩序管理规定，文明观赛，理性对待输赢;服从现场民警及工作人员指挥，场内严禁抽烟、严禁踩踏座椅、严禁投掷物品、严禁翻越隔离设施;严禁穿着印有侮导性标语的服饰，严禁携带印有侮辱性标语的横幅、海报等展示道具。\\n12.购买、持有或使用门票的观众均被认为已阅读并接受以上条款。",
      "orderTopTip": "",
      "orderTopTipInfo": "<p>下单高峰期订单状态有延迟，请在高峰期后进行查看！如已付款，请等待系统确认，不要取消订单！</p>",
      "parentsChildTip": "1.亲子票单场票购票入口通过单场票订单内的球票进入，套票购票入口通过套票票夹进入。\\n2.仅限成人票（购票人年龄大于18岁）进行申购，非成人票不能申购亲子票。\\n3.外籍人员无法申购亲子票。\\n4.一张成人票仅限申购一张亲子票，申购人年龄需为6-12周岁（以比赛日为准）。\\n5.亲子票票价为对应座位单场票票价的50%（向下取整到元）\\n6.亲子票可单独退票，成人票退票后申购的亲子票一同退票。\\n7.申购截止时间同售票截止时间。\\n8.亲子票仅填写姓名和身份证号，联系方式与成人票相同。",
      "singleTicketParentsChild": false,
      "groupTicketParentsChild": false,
      "mathc_id": 37
    }
  },
  "time": 1740554734
}
`;

export const region_json = `{
       "btn_status": 1,
       "btn_text": "立即购买",
       "code": 1,
       "data": [{
       "usable_count": 3665,
       "max_price": "400.00",
       "min_price": "120.00",
       "region": 1,
       "list": [{
       "usable_count": "56",
       "price": "180.00",
       "estate": 2,
       "name": "102",
       "id": 2
       }, {
       "usable_count": "202",
       "price": "180.00",
       "estate": 3,
       "name": "103",
       "id": 3
       }, {
       "usable_count": "10",
       "price": "180.00",
       "estate": 4,
       "name": "104",
       "id": 4
       }, {
       "usable_count": "245",
       "price": "180.00",
       "estate": 5,
       "name": "105",
       "id": 5
       }, {
       "usable_count": "376",
       "price": "180.00",
       "estate": 6,
       "name": "106",
       "id": 6
       }, {
       "usable_count": "422",
       "price": "180.00",
       "estate": 7,
       "name": "107",
       "id": 7
       }, {
       "usable_count": "553",
       "price": "180.00",
       "estate": 8,
       "name": "108",
       "id": 8
       }, {
       "usable_count": "10",
       "price": "220.00",
       "estate": 9,
       "name": "109",
       "id": 9
       }, {
       "usable_count": "237",
       "price": "220.00",
       "estate": 10,
       "name": "110",
       "id": 10
       }, {
       "usable_count": "10",
       "price": "220.00",
       "estate": 11,
       "name": "111",
       "id": 11
       }, {
       "usable_count": "10",
       "price": "220.00",
       "estate": 12,
       "name": "112",
       "id": 12
       }, {
       "usable_count": "10",
       "price": "220.00",
       "estate": 13,
       "name": "113",
       "id": 13
       },
        {
       "usable_count": "10",
       "price": "220.00",
       "estate": 14,
       "name": "114",
       "id": 14
       },
       {
       "usable_count": "55",
       "price": "180.00",
       "estate": 15,
       "name": "115",
       "id": 15
       },
       {
       "usable_count": "55",
       "price": "180.00",
       "estate": 16,
       "name": "116",
       "id": 16
       },
                {
       "usable_count": "261",
       "price": "180.00",
       "estate": 17,
       "name": "117",
       "id": 17
       }, {
       "usable_count": "10",
       "price": "120.00",
       "estate": 18,
       "name": "118",
       "id": 18
       },
        {
       "usable_count": "10",
       "price": "120.00",
       "estate": 19,
       "name": "119",
       "id": 19
       }, {
       "usable_count": "169",
       "price": "120.00",
       "estate": 22,
       "name": "122",
       "id": 22
       }, {
       "usable_count": "315",
       "price": "180.00",
       "estate": 23,
       "name": "123",
       "id": 23
       }, {
       "usable_count": "60",
       "price": "220.00",
       "estate": 24,
       "name": "124",
       "id": 24
       },{
       "usable_count": "60",
       "price": "220.00",
       "estate": 25,
       "name": "125",
       "id": 25
       }, {
       "usable_count": "10",
       "price": "220.00",
       "estate": 26,
       "name": "126",
       "id": 26
       }, {
       "usable_count": "10",
       "price": "400.00",
       "estate": 27,
       "name": "127",
       "id": 27
       }, {
       "usable_count": "123",
       "price": "400.00",
       "estate": 29,
       "name": "129",
       "id": 29
       }, {
       "usable_count": "185",
       "price": "220.00",
       "estate": 30,
       "name": "130",
       "id": 30
       }, {
       "usable_count": "306",
       "price": "220.00",
       "estate": 31,
       "name": "131",
       "id": 31
       }],
       "name": "首层看台"
       }, {
       "usable_count": 261,
       "max_price": "1288.00",
       "min_price": "1288.00",
       "region": 3,
       "list": [{
       "usable_count": "108",
       "price": "1288.00",
       "estate": 1,
       "name": "VIP1",
       "id": 1
       }, {
       "usable_count": "153",
       "price": "1288.00",
       "estate": 3,
       "name": "VIP3",
       "id": 3
       }],
       "name": "VIP"
       }, {
       "usable_count": 7011,
       "max_price": "180.00",
       "min_price": "100.00",
       "region": 6,
       "list": [{
       "usable_count": "10",
       "price": "100.00",
       "estate": 4,
       "name": "504",
       "id": 4
       }, {
       "usable_count": "10",
       "price": "100.00",
       "estate": 6,
       "name": "506",
       "id": 6
       }, {
       "usable_count": "43",
       "price": "100.00",
       "estate": 7,
       "name": "507",
       "id": 7
       }, {
       "usable_count": "77",
       "price": "120.00",
       "estate": 8,
       "name": "508",
       "id": 8
       }, {
       "usable_count": "403",
       "price": "120.00",
       "estate": 9,
       "name": "509",
       "id": 9
       }, {
       "usable_count": "363",
       "price": "120.00",
       "estate": 10,
       "name": "510",
       "id": 10
       }, {
       "usable_count": "68",
       "price": "150.00",
       "estate": 11,
       "name": "511",
       "id": 11
       }, {
       "usable_count": "118",
       "price": "150.00",
       "estate": 12,
       "name": "512",
       "id": 12
       }, {
       "usable_count": "237",
       "price": "180.00",
       "estate": 13,
       "name": "513",
       "id": 13
       }, {
       "usable_count": "10",
       "price": "180.00",
       "estate": 14,
       "name": "514",
       "id": 14
       }, {
       "usable_count": "219",
       "price": "180.00",
       "estate": 15,
       "name": "515",
       "id": 15
       }, {
       "usable_count": "178",
       "price": "150.00",
       "estate": 16,
       "name": "516",
       "id": 16
       }, {
       "usable_count": "315",
       "price": "150.00",
       "estate": 17,
       "name": "517",
       "id": 17
       }, {
       "usable_count": "307",
       "price": "120.00",
       "estate": 18,
       "name": "518",
       "id": 18
       }, {
       "usable_count": "294",
       "price": "120.00",
       "estate": 19,
       "name": "519",
       "id": 19
       }, {
       "usable_count": "493",
       "price": "120.00",
       "estate": 20,
       "name": "520",
       "id": 20
       }, {
       "usable_count": "185",
       "price": "100.00",
       "estate": 21,
       "name": "521",
       "id": 21
       }, {
       "usable_count": "192",
       "price": "100.00",
       "estate": 22,
       "name": "522",
       "id": 22
       }, {
       "usable_count": "10",
       "price": "100.00",
       "estate": 23,
       "name": "523",
       "id": 23
       }, {
       "usable_count": "88",
       "price": "100.00",
       "estate": 24,
       "name": "524",
       "id": 24
       }, {
       "usable_count": "436",
       "price": "100.00",
       "estate": 25,
       "name": "525",
       "id": 25
       }, {
       "usable_count": "548",
       "price": "120.00",
       "estate": 26,
       "name": "526",
       "id": 26
       }, {
       "usable_count": "254",
       "price": "120.00",
       "estate": 27,
       "name": "527",
       "id": 27
       }, {
       "usable_count": "297",
       "price": "120.00",
       "estate": 28,
       "name": "528",
       "id": 28
       }, {
       "usable_count": "261",
       "price": "150.00",
       "estate": 29,
       "name": "529",
       "id": 29
       }, {
       "usable_count": "181",
       "price": "150.00",
       "estate": 30,
       "name": "530",
       "id": 30
       }, {
       "usable_count": "283",
       "price": "180.00",
       "estate": 31,
       "name": "531",
       "id": 31
       }, {
       "usable_count": "322",
       "price": "180.00",
       "estate": 32,
       "name": "532",
       "id": 32
       }, {
       "usable_count": "296",
       "price": "180.00",
       "estate": 33,
       "name": "533",
       "id": 33
       }, {
       "usable_count": "287",
       "price": "150.00",
       "estate": 34,
       "name": "534",
       "id": 34
       }, {
       "usable_count": "156",
       "price": "150.00",
       "estate": 35,
       "name": "535",
       "id": 35
       }],
       "name": "顶层看台"
       }],
       "msg": "获取成功",
       "max_num": 2,
       "type_code": 1
       }`;
