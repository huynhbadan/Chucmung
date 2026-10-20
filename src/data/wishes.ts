export interface Wish {
  id: string;
  category: 'a2';
  categoryLabel: string;
  recipient: string;
  content: string;
  poem?: string;
  highlight: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Tất cả lời chúc A2' },
] as const;

export const WISHES: Wish[] = [
  {
    id: 'a2-1',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Chúc những cô gái A2 ngày 20/10 ngập tràn niềm vui, nụ cười luôn tỏa nắng rạng rỡ, học giỏi, thi đâu đỗ đó và mãi là niềm tự hào của tập thể A2 chúng mình! 🌸💖',
    poem: 'A2 gái đẹp tuyệt vời / Thông minh rạng rỡ sáng ngời tương lai!',
    highlight: 'Niềm tự hào của A2',
  },
  {
    id: 'a2-2',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Các bóng hồng A2',
    content: 'Gửi tới tất cả các bạn nữ A2 thân mến: Cảm ơn các bạn vì đã luôn làm cho lớp A2 thêm phần rộn rã, ấm áp và tươi vui. Chúc các bạn nhận quà mỏi tay, hoa ngập bàn và luôn xinh đẹp lung linh nhé! 💐✨',
    highlight: 'Bóng hồng xinh đẹp A2',
  },
  {
    id: 'a2-3',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2 thân yêu',
    content: 'Chúc các nàng thơ của A2 ngày 20/10: Điểm số luôn cao vút, không lo deadline, ví luôn đầy tiền và crush tự giác tỏ tình nha! Mãi là những cô gái đáng yêu nhất quả đất! 🥰🎁',
    highlight: 'Đáng yêu nhất quả đất',
  },
  {
    id: 'a2-4',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Tập thể nữ sinh A2',
    content: 'Nhân ngày 20/10, chúc những cô gái A2 luôn tự tin, kiêu hãnh theo đuổi đam mê, giữ mãi ngọn lửa nhiệt huyết tuổi thanh xuân và cùng nhau tạo nên những ký ức rực rỡ nhất! 🌟',
    poem: 'Thanh xuân rực rỡ A2 / Cùng nhau tỏa sáng tương lai huy hoàng.',
    highlight: 'Thanh xuân rực rỡ A2',
  },
  {
    id: 'a2-5',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Hội chị em A2',
    content: 'Chúc các cô gái A2 luôn xinh tươi như hoa buổi sớm, dịu dàng mà không kém phần bản lĩnh, ăn mãi không béo và lúc nào cũng tràn ngập tiếng cười giòn tan! 💗',
    highlight: 'Xinh tươi và bản lĩnh',
  },
  {
    id: 'a2-6',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Chúc các bạn nữ A2 mỗi ngày đến lớp đều là một ngày vui, bài kiểm tra nào cũng điểm 9 điểm 10, nhan sắc ngày càng thăng hạng và luôn được cả lớp cưng chiều! 🌷',
    highlight: 'Mỗi ngày đến lớp là một ngày vui',
  },
  {
    id: 'a2-7',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Các nàng thơ A2',
    content: 'A2 có thể thiếu nhiều thứ, nhưng tuyệt đối không bao giờ thiếu đi sự đáng yêu và rạng rỡ của các bạn nữ! Chúc những cô gái A2 một ngày 20/10 thật ngọt ngào và hạnh phúc! 💝',
    highlight: 'Lớp A2 rạng rỡ nhờ có các bạn',
  },
  {
    id: 'a2-8',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Chúc các bạn nữ lớp A2 ngày 20/10 nhận được thật nhiều hoa, nhiều quà, sáng mở mắt ra thấy tiền ting ting, và luôn giữ trọn nụ cười hồn nhiên của tuổi học trò! 🎁✨',
    highlight: 'Quà ngập tràn, nụ cười rạng rỡ',
  },
  {
    id: 'a2-9',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Gửi những đóa hoa đẹp nhất của A2: Chúc các bạn luôn tự tin tỏa sáng theo cách riêng của mình. Hãy luôn tin rằng các bạn là những mảnh ghép tuyệt vời và độc nhất vô nhị! 🌺',
    highlight: 'Tỏa sáng theo cách riêng',
  },
  {
    id: 'a2-10',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Hội bạn gái A2',
    content: 'Chúc những cô gái A2 20/10: Xinh đẹp không đối thủ, thông minh không giới hạn, năng lượng luôn tràn trề và ước mơ nào cũng sớm chạm tay tới! 🚀💖',
    highlight: 'Xinh đẹp không đối thủ',
  },
  {
    id: 'a2-11',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Cảm ơn những cô gái A2 đã luôn đồng hành, cùng học, cùng chơi và sẻ chia bao kỷ niệm khó quên. Chúc các bạn một ngày 20/10 thật trọn vẹn và ấm áp! 👭',
    highlight: 'Gắn bó tình bạn A2',
  },
  {
    id: 'a2-12',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Chúc các cô gái A2 hôm nay được làm nữ hoàng: Không phải trực nhật, không lo kiểm tra bài cũ, chỉ việc ngồi xinh xắn nhận quà và nhận lời chúc thôi nhé! 👑💅',
    highlight: 'Hôm nay là nữ hoàng A2',
  },
  {
    id: 'a2-13',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Các bạn nữ A2',
    content: 'Mong rằng mọi điều tốt đẹp, may mắn và dịu dàng nhất của cuộc đời sẽ luôn ở bên những cô gái A2. Chúc các bạn luôn an yên và vui tươi mỗi ngày! 🍃🌸',
    highlight: 'Mọi điều dịu dàng ở bên bạn',
  },
  {
    id: 'a2-14',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: 'Chúc những cô gái A2 thanh xuân rực rỡ như nắng hạ, ngọt ngào như mùa thu, ấm áp giữa mùa đông và tươi vui như mùa xuân. Mãi mãi là niềm tự hào của A2! 🌈',
    poem: 'Nắng sân trường chiếu qua khung cửa sổ / Chúc gái A2 mãi rạng rỡ nụ cười.',
    highlight: 'Thanh xuân bốn mùa rực rỡ',
  },
  {
    id: 'a2-15',
    category: 'a2',
    categoryLabel: 'Những cô gái A2',
    recipient: 'Những cô gái A2',
    content: '20/10 chúc các bạn nữ lớp A2 ăn nhiều không mập, ngủ kỹ da vẫn đẹp, học ít hiểu nhiều, thi cử toàn điểm 10 và lúc nào cũng là cô gái hạnh phúc nhất! 💕',
    highlight: 'Cô gái hạnh phúc nhất',
  },
];
