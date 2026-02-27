// Japanese Learning Data for Gambare App

export interface Flashcard {
  id: string;
  japanese: string;
  reading: string;
  english: string;
  example: string;
  exampleReading: string;
  exampleEnglish: string;
  category: string;
  level: 'N5' | 'N4' | 'N3' | 'beginner' | 'intermediate';
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'matching' | 'fill-blank' | 'listening' | 'translation';
  question: string;
  questionReading?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface ConversationScenario {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  icon: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  prompts: string[];
}

export interface VoicePhrase {
  id: string;
  japanese: string;
  reading: string;
  english: string;
  category: 'greetings' | 'numbers' | 'daily' | 'questions' | 'expressions';
  difficulty: 1 | 2 | 3 | 4 | 5;
}

// Extended Flashcard Data - 150+ cards
export const flashcards: Flashcard[] = [
  // ==================== GREETINGS ====================
  { id: 'f1', japanese: 'こんにちは', reading: 'konnichiwa', english: 'Hello', example: 'こんにちは、元気ですか？', exampleReading: 'Konnichiwa, genki desu ka?', exampleEnglish: 'Hello, how are you?', category: 'Greetings', level: 'N5' },
  { id: 'f2', japanese: 'おはようございます', reading: 'ohayou gozaimasu', english: 'Good morning', example: 'おはようございます、先生！', exampleReading: 'Ohayou gozaimasu, sensei!', exampleEnglish: 'Good morning, teacher!', category: 'Greetings', level: 'N5' },
  { id: 'f3', japanese: 'こんばんは', reading: 'konbanwa', english: 'Good evening', example: 'こんばんは、今日はどうでしたか？', exampleReading: 'Konbanwa, kyou wa dou deshita ka?', exampleEnglish: 'Good evening, how was your day?', category: 'Greetings', level: 'N5' },
  { id: 'f4', japanese: 'さようなら', reading: 'sayounara', english: 'Goodbye', example: 'さようなら、また明日！', exampleReading: 'Sayounara, mata ashita!', exampleEnglish: 'Goodbye, see you tomorrow!', category: 'Greetings', level: 'N5' },
  { id: 'f5', japanese: 'ありがとう', reading: 'arigatou', english: 'Thank you', example: 'ありがとう、助かりました！', exampleReading: 'Arigatou, tasukarimashita!', exampleEnglish: 'Thank you, you helped me!', category: 'Greetings', level: 'N5' },
  { id: 'f6', japanese: 'すみません', reading: 'sumimasen', english: 'Excuse me / I\'m sorry', example: 'すみません、道を教えてください。', exampleReading: 'Sumimasen, michi wo oshiete kudasai.', exampleEnglish: 'Excuse me, please tell me the way.', category: 'Greetings', level: 'N5' },
  { id: 'f7', japanese: 'ありがとうございます', reading: 'arigatou gozaimasu', english: 'Thank you very much', example: 'ありがとうございます、とても嬉しいです。', exampleReading: 'Arigatou gozaimasu, totemo ureshii desu.', exampleEnglish: 'Thank you very much, I\'m very happy.', category: 'Greetings', level: 'N5' },
  { id: 'f8', japanese: 'はじめまして', reading: 'hajimemashite', english: 'Nice to meet you', example: 'はじめまして、田中です。', exampleReading: 'Hajimemashite, Tanaka desu.', exampleEnglish: 'Nice to meet you, I\'m Tanaka.', category: 'Greetings', level: 'N5' },
  { id: 'f9', japanese: 'お元気ですか', reading: 'ogenki desu ka', english: 'How are you?', example: 'お元気ですか？元気です！', exampleReading: 'Ogenki desu ka? Genki desu!', exampleEnglish: 'How are you? I\'m fine!', category: 'Greetings', level: 'N5' },
  { id: 'f10', japanese: 'お休みなさい', reading: 'oyasuminasai', english: 'Good night', example: 'お休みなさい、良い夢を！', exampleReading: 'Oyasuminasai, yoi yume wo!', exampleEnglish: 'Good night, have sweet dreams!', category: 'Greetings', level: 'N5' },
  { id: 'f11', japanese: 'いってらっしゃい', reading: 'itterasshai', english: 'Have a good day (to someone leaving)', example: 'いってらっしゃい！', exampleReading: 'Itterasshai!', exampleEnglish: 'Have a good day!', category: 'Greetings', level: 'N5' },
  { id: 'f12', japanese: 'ただいま', reading: 'tadaima', english: 'I\'m home', example: 'ただいま！おかえり！', exampleReading: 'Tadaima! Okaeri!', exampleEnglish: 'I\'m home! Welcome back!', category: 'Greetings', level: 'N5' },
  { id: 'f13', japanese: 'おかえりなさい', reading: 'okaerinasai', english: 'Welcome home', example: 'おかえりなさい、お疲れ様でした。', exampleReading: 'Okaerinasai, otsukaresama deshita.', exampleEnglish: 'Welcome home, good job today.', category: 'Greetings', level: 'N5' },
  
  // ==================== PRONOUNS ====================
  { id: 'f20', japanese: '私', reading: 'watashi', english: 'I / me', example: '私は学生です。', exampleReading: 'Watashi wa gakusei desu.', exampleEnglish: 'I am a student.', category: 'Pronouns', level: 'N5' },
  { id: 'f21', japanese: 'あなた', reading: 'anata', english: 'You', example: 'あなたは誰ですか？', exampleReading: 'Anata wa dare desu ka?', exampleEnglish: 'Who are you?', category: 'Pronouns', level: 'N5' },
  { id: 'f22', japanese: '彼', reading: 'kare', english: 'He / boyfriend', example: '彼は日本人です。', exampleReading: 'Kare wa nihonjin desu.', exampleEnglish: 'He is Japanese.', category: 'Pronouns', level: 'N5' },
  { id: 'f23', japanese: '彼女', reading: 'kanojo', english: 'She / girlfriend', example: '彼女は先生です。', exampleReading: 'Kanojo wa sensei desu.', exampleEnglish: 'She is a teacher.', category: 'Pronouns', level: 'N5' },
  { id: 'f24', japanese: '私たち', reading: 'watashitachi', english: 'We / us', example: '私たち学生です。', exampleReading: 'Watashitachi gakusei desu.', exampleEnglish: 'We are students.', category: 'Pronouns', level: 'N5' },
  { id: 'f25', japanese: '彼ら', reading: 'karera', english: 'They', example: '彼らは友達です。', exampleReading: 'Karera wa tomodachi desu.', exampleEnglish: 'They are friends.', category: 'Pronouns', level: 'N4' },
  { id: 'f26', japanese: 'これ', reading: 'kore', english: 'This (close to speaker)', example: 'これは何ですか？', exampleReading: 'Kore wa nan desu ka?', exampleEnglish: 'What is this?', category: 'Pronouns', level: 'N5' },
  { id: 'f27', japanese: 'それ', reading: 'sore', english: 'That (close to listener)', example: 'それは私の本です。', exampleReading: 'Sore wa watashi no hon desu.', exampleEnglish: 'That is my book.', category: 'Pronouns', level: 'N5' },
  { id: 'f28', japanese: 'あれ', reading: 'are', english: 'That over there', example: 'あれは富士山です。', exampleReading: 'Are wa Fujisan desu.', exampleEnglish: 'That over there is Mt. Fuji.', category: 'Pronouns', level: 'N5' },
  { id: 'f29', japanese: '誰', reading: 'dare', english: 'Who', example: 'あの人は誰ですか？', exampleReading: 'Ano hito wa dare desu ka?', exampleEnglish: 'Who is that person?', category: 'Pronouns', level: 'N5' },
  { id: 'f30', japanese: '何', reading: 'nani', english: 'What', example: 'これは何ですか？', exampleReading: 'Kore wa nan desu ka?', exampleEnglish: 'What is this?', category: 'Pronouns', level: 'N5' },

  // ==================== VERBS - BASIC ====================
  { id: 'f40', japanese: '食べる', reading: 'taberu', english: 'To eat', example: '朝ご飯を食べます。', exampleReading: 'Asagohan wo tabemasu.', exampleEnglish: 'I eat breakfast.', category: 'Verbs', level: 'N5' },
  { id: 'f41', japanese: '飲む', reading: 'nomu', english: 'To drink', example: '水を飲みます。', exampleReading: 'Mizu wo nomimasu.', exampleEnglish: 'I drink water.', category: 'Verbs', level: 'N5' },
  { id: 'f42', japanese: '行く', reading: 'iku', english: 'To go', example: '学校に行きます。', exampleReading: 'Gakkou ni ikimasu.', exampleEnglish: 'I go to school.', category: 'Verbs', level: 'N5' },
  { id: 'f43', japanese: '来る', reading: 'kuru', english: 'To come', example: '友達が家に来ます。', exampleReading: 'Tomodachi ga ie ni kimasu.', exampleEnglish: 'A friend comes to my house.', category: 'Verbs', level: 'N5' },
  { id: 'f44', japanese: '見る', reading: 'miru', english: 'To see / watch', example: '映画を見ます。', exampleReading: 'Eiga wo mimasu.', exampleEnglish: 'I watch a movie.', category: 'Verbs', level: 'N5' },
  { id: 'f45', japanese: '聞く', reading: 'kiku', english: 'To listen / ask', example: '音楽を聞きます。', exampleReading: 'Ongaku wo kikimasu.', exampleEnglish: 'I listen to music.', category: 'Verbs', level: 'N5' },
  { id: 'f46', japanese: '話す', reading: 'hanasu', english: 'To speak / talk', example: '日本語を話します。', exampleReading: 'Nihongo wo hanashimasu.', exampleEnglish: 'I speak Japanese.', category: 'Verbs', level: 'N5' },
  { id: 'f47', japanese: '読む', reading: 'yomu', english: 'To read', example: '本を読みます。', exampleReading: 'Hon wo yomimasu.', exampleEnglish: 'I read a book.', category: 'Verbs', level: 'N5' },
  { id: 'f48', japanese: '書く', reading: 'kaku', english: 'To write', example: '手紙を書きます。', exampleReading: 'Tegami wo kakimasu.', exampleEnglish: 'I write a letter.', category: 'Verbs', level: 'N5' },
  { id: 'f49', japanese: '買う', reading: 'kau', english: 'To buy', example: '本を買います。', exampleReading: 'Hon wo kaimasu.', exampleEnglish: 'I buy a book.', category: 'Verbs', level: 'N5' },
  { id: 'f50', japanese: '売る', reading: 'uru', english: 'To sell', example: '家を売ります。', exampleReading: 'Ie wo urimasu.', exampleEnglish: 'I sell a house.', category: 'Verbs', level: 'N5' },
  { id: 'f51', japanese: '寝る', reading: 'neru', english: 'To sleep', example: '十一時に寝ます。', exampleReading: 'Juuichiji ni nemasu.', exampleEnglish: 'I sleep at 11 o\'clock.', category: 'Verbs', level: 'N5' },
  { id: 'f52', japanese: '起きる', reading: 'okiru', english: 'To wake up', example: '六時に起きます。', exampleReading: 'Rokuji ni okimasu.', exampleEnglish: 'I wake up at 6 o\'clock.', category: 'Verbs', level: 'N5' },
  { id: 'f53', japanese: '走る', reading: 'hashiru', english: 'To run', example: '公園で走ります。', exampleReading: 'Kouen de hashirimasu.', exampleEnglish: 'I run in the park.', category: 'Verbs', level: 'N5' },
  { id: 'f54', japanese: '歩く', reading: 'aruku', english: 'To walk', example: '駅まで歩きます。', exampleReading: 'Eki made arukimasu.', exampleEnglish: 'I walk to the station.', category: 'Verbs', level: 'N5' },
  { id: 'f55', japanese: '帰る', reading: 'kaeru', english: 'To return / go home', example: '家に帰ります。', exampleReading: 'Ie ni kaerimasu.', exampleEnglish: 'I go home.', category: 'Verbs', level: 'N5' },
  { id: 'f56', japanese: '入る', reading: 'hairu', english: 'To enter', example: '部屋に入ります。', exampleReading: 'Heya ni hairimasu.', exampleEnglish: 'I enter the room.', category: 'Verbs', level: 'N5' },
  { id: 'f57', japanese: '出る', reading: 'deru', english: 'To exit / leave', example: '家を出ます。', exampleReading: 'Ie wo demasu.', exampleEnglish: 'I leave the house.', category: 'Verbs', level: 'N5' },
  { id: 'f58', japanese: '待つ', reading: 'matsu', english: 'To wait', example: 'ここで待ちます。', exampleReading: 'Koko de machimasu.', exampleEnglish: 'I wait here.', category: 'Verbs', level: 'N5' },
  { id: 'f59', japanese: '会う', reading: 'au', english: 'To meet', example: '友達に会います。', exampleReading: 'Tomodachi ni aimasu.', exampleEnglish: 'I meet a friend.', category: 'Verbs', level: 'N5' },

  // ==================== VERBS - INTERMEDIATE ====================
  { id: 'f70', japanese: '勉強する', reading: 'benkyou suru', english: 'To study', example: '日本語を勉強しています。', exampleReading: 'Nihongo wo benkyou shiteimasu.', exampleEnglish: 'I am studying Japanese.', category: 'Verbs', level: 'N4' },
  { id: 'f71', japanese: '仕事する', reading: 'shigoto suru', english: 'To work', example: '毎日仕事をします。', exampleReading: 'Mainichi shigoto wo shimasu.', exampleEnglish: 'I work every day.', category: 'Verbs', level: 'N4' },
  { id: 'f72', japanese: '旅行する', reading: 'ryokou suru', english: 'To travel', example: '日本を旅行したいです。', exampleReading: 'Nihon wo ryokou shitai desu.', exampleEnglish: 'I want to travel Japan.', category: 'Verbs', level: 'N4' },
  { id: 'f73', japanese: '料理する', reading: 'ryouri suru', english: 'To cook', example: '夕食を料理します。', exampleReading: 'Yuushoku wo ryourishimasu.', exampleEnglish: 'I cook dinner.', category: 'Verbs', level: 'N4' },
  { id: 'f74', japanese: '洗濯する', reading: 'sentaku suru', english: 'To do laundry', example: '服を洗濯します。', exampleReading: 'Fuku wo sentaku shimasu.', exampleEnglish: 'I do laundry.', category: 'Verbs', level: 'N4' },
  { id: 'f75', japanese: '掃除する', reading: 'souji suru', english: 'To clean', example: '部屋を掃除します。', exampleReading: 'Heya wo souji shimasu.', exampleEnglish: 'I clean the room.', category: 'Verbs', level: 'N4' },
  { id: 'f76', japanese: '運転する', reading: 'unten suru', english: 'To drive', example: '車を運転します。', exampleReading: 'Kuruma wo unten shimasu.', exampleEnglish: 'I drive a car.', category: 'Verbs', level: 'N4' },
  { id: 'f77', japanese: '散歩する', reading: 'sanpo suru', english: 'To take a walk', example: '公園を散歩します。', exampleReading: 'Kouen wo sanpo shimasu.', exampleEnglish: 'I take a walk in the park.', category: 'Verbs', level: 'N4' },
  { id: 'f78', japanese: '考える', reading: 'kangaeru', english: 'To think', example: 'よく考えてください。', exampleReading: 'Yoku kangaete kudasai.', exampleEnglish: 'Please think carefully.', category: 'Verbs', level: 'N4' },
  { id: 'f79', japanese: '始める', reading: 'hajimeru', english: 'To start / begin', example: '授業を始めます。', exampleReading: 'Jugyou wo hajimemasu.', exampleEnglish: 'I start the class.', category: 'Verbs', level: 'N4' },
  { id: 'f80', japanese: '終わる', reading: 'owaru', english: 'To finish / end', example: '仕事が終わりました。', exampleReading: 'Shigoto ga owarimashita.', exampleEnglish: 'Work has finished.', category: 'Verbs', level: 'N4' },

  // ==================== ADJECTIVES ====================
  { id: 'f90', japanese: '大きい', reading: 'ookii', english: 'Big / large', example: 'この家は大きいです。', exampleReading: 'Kono ie wa ookii desu.', exampleEnglish: 'This house is big.', category: 'Adjectives', level: 'N5' },
  { id: 'f91', japanese: '小さい', reading: 'chiisai', english: 'Small', example: '私の猫は小さいです。', exampleReading: 'Watashi no neko wa chiisai desu.', exampleEnglish: 'My cat is small.', category: 'Adjectives', level: 'N5' },
  { id: 'f92', japanese: '新しい', reading: 'atarashii', english: 'New', example: '新しい車を買いました。', exampleReading: 'Atarashii kuruma wo kaimashita.', exampleEnglish: 'I bought a new car.', category: 'Adjectives', level: 'N5' },
  { id: 'f93', japanese: '古い', reading: 'furui', english: 'Old', example: 'この建物は古いです。', exampleReading: 'Kono tatemono wa furui desu.', exampleEnglish: 'This building is old.', category: 'Adjectives', level: 'N5' },
  { id: 'f94', japanese: '楽しい', reading: 'tanoshii', english: 'Fun / enjoyable', example: 'パーティーは楽しかったです。', exampleReading: 'Paatii wa tanoshikatta desu.', exampleEnglish: 'The party was fun.', category: 'Adjectives', level: 'N5' },
  { id: 'f95', japanese: '美しい', reading: 'utsukushii', english: 'Beautiful', example: '富士山は美しいです。', exampleReading: 'Fujisan wa utsukushii desu.', exampleEnglish: 'Mt. Fuji is beautiful.', category: 'Adjectives', level: 'N4' },
  { id: 'f96', japanese: '暑い', reading: 'atsui', english: 'Hot (weather)', example: '今日は暑いです。', exampleReading: 'Kyou wa atsui desu.', exampleEnglish: 'Today is hot.', category: 'Adjectives', level: 'N5' },
  { id: 'f97', japanese: '寒い', reading: 'samui', english: 'Cold (weather)', example: '冬は寒いです。', exampleReading: 'Fuyu wa samui desu.', exampleEnglish: 'Winter is cold.', category: 'Adjectives', level: 'N5' },
  { id: 'f98', japanese: '熱い', reading: 'atsui', english: 'Hot (object)', example: 'お茶が熱いです。', exampleReading: 'Ocha ga atsui desu.', exampleEnglish: 'The tea is hot.', category: 'Adjectives', level: 'N5' },
  { id: 'f99', japanese: '冷たい', reading: 'tsumetai', english: 'Cold (object)', example: '水は冷たいです。', exampleReading: 'Mizu wa tsumetai desu.', exampleEnglish: 'The water is cold.', category: 'Adjectives', level: 'N5' },
  { id: 'f100', japanese: '高い', reading: 'takai', english: 'High / expensive', example: 'この店は高いです。', exampleReading: 'Kono mise wa takai desu.', exampleEnglish: 'This store is expensive.', category: 'Adjectives', level: 'N5' },
  { id: 'f101', japanese: '安い', reading: 'yasui', english: 'Cheap', example: 'この店は安いです。', exampleReading: 'Kono mise wa yasui desu.', exampleEnglish: 'This store is cheap.', category: 'Adjectives', level: 'N5' },
  { id: 'f102', japanese: '多い', reading: 'ooi', english: 'Many / much', example: '人が多いです。', exampleReading: 'Hito ga ooi desu.', exampleEnglish: 'There are many people.', category: 'Adjectives', level: 'N5' },
  { id: 'f103', japanese: '少ない', reading: 'sukunai', english: 'Few / little', example: '時間が少ないです。', exampleReading: 'Jikan ga sukunai desu.', exampleEnglish: 'There is little time.', category: 'Adjectives', level: 'N5' },
  { id: 'f104', japanese: '良い', reading: 'yoi/ii', english: 'Good', example: '天気が良いです。', exampleReading: 'Tenki ga yoi desu.', exampleEnglish: 'The weather is good.', category: 'Adjectives', level: 'N5' },
  { id: 'f105', japanese: '悪い', reading: 'warui', english: 'Bad', example: '天気が悪いです。', exampleReading: 'Tenki ga warui desu.', exampleEnglish: 'The weather is bad.', category: 'Adjectives', level: 'N5' },
  { id: 'f106', japanese: '忙しい', reading: 'isogashii', english: 'Busy', example: '今日は忙しいです。', exampleReading: 'Kyou wa isogashii desu.', exampleEnglish: 'Today is busy.', category: 'Adjectives', level: 'N5' },
  { id: 'f107', japanese: '難しい', reading: 'muzukashii', english: 'Difficult', example: '日本語は難しいです。', exampleReading: 'Nihongo wa muzukashii desu.', exampleEnglish: 'Japanese is difficult.', category: 'Adjectives', level: 'N5' },
  { id: 'f108', japanese: '易しい', reading: 'yasashii', english: 'Easy', example: 'この問題は易しいです。', exampleReading: 'Kono mondai wa yasashii desu.', exampleEnglish: 'This problem is easy.', category: 'Adjectives', level: 'N5' },
  { id: 'f109', japanese: '長い', reading: 'nagai', english: 'Long', example: '髪が長いです。', exampleReading: 'Kami ga nagai desu.', exampleEnglish: 'My hair is long.', category: 'Adjectives', level: 'N5' },
  { id: 'f110', japanese: '短い', reading: 'mijikai', english: 'Short', example: '髪が短いです。', exampleReading: 'Kami ga mijikai desu.', exampleEnglish: 'My hair is short.', category: 'Adjectives', level: 'N5' },

  // ==================== NUMBERS ====================
  { id: 'f120', japanese: '一', reading: 'ichi', english: 'One', example: 'りんごを一つください。', exampleReading: 'Ringo wo hitotsu kudasai.', exampleEnglish: 'Please give me one apple.', category: 'Numbers', level: 'N5' },
  { id: 'f121', japanese: '二', reading: 'ni', english: 'Two', example: '二人で行きます。', exampleReading: 'Futari de ikimasu.', exampleEnglish: 'We go together (two people).', category: 'Numbers', level: 'N5' },
  { id: 'f122', japanese: '三', reading: 'san', english: 'Three', example: '三時です。', exampleReading: 'Sanji desu.', exampleEnglish: 'It is 3 o\'clock.', category: 'Numbers', level: 'N5' },
  { id: 'f123', japanese: '四', reading: 'yon/shi', english: 'Four', example: '四月です。', exampleReading: 'Shigatsu desu.', exampleEnglish: 'It is April.', category: 'Numbers', level: 'N5' },
  { id: 'f124', japanese: '五', reading: 'go', english: 'Five', example: '五歳です。', exampleReading: 'Gosai desu.', exampleEnglish: 'I am five years old.', category: 'Numbers', level: 'N5' },
  { id: 'f125', japanese: '六', reading: 'roku', english: 'Six', example: '六時です。', exampleReading: 'Rokuji desu.', exampleEnglish: 'It is 6 o\'clock.', category: 'Numbers', level: 'N5' },
  { id: 'f126', japanese: '七', reading: 'nana/shichi', english: 'Seven', example: '七時です。', exampleReading: 'Shichiji desu.', exampleEnglish: 'It is 7 o\'clock.', category: 'Numbers', level: 'N5' },
  { id: 'f127', japanese: '八', reading: 'hachi', english: 'Eight', example: '八時です。', exampleReading: 'Hachiji desu.', exampleEnglish: 'It is 8 o\'clock.', category: 'Numbers', level: 'N5' },
  { id: 'f128', japanese: '九', reading: 'kyuu/ku', english: 'Nine', example: '九時です。', exampleReading: 'Kuji desu.', exampleEnglish: 'It is 9 o\'clock.', category: 'Numbers', level: 'N5' },
  { id: 'f129', japanese: '十', reading: 'juu', english: 'Ten', example: '十人です。', exampleReading: 'Juunin desu.', exampleEnglish: 'There are ten people.', category: 'Numbers', level: 'N5' },
  { id: 'f130', japanese: '百', reading: 'hyaku', english: 'One hundred', example: '百円です。', exampleReading: 'Hyakuen desu.', exampleEnglish: 'It is 100 yen.', category: 'Numbers', level: 'N5' },
  { id: 'f131', japanese: '千', reading: 'sen', english: 'One thousand', example: '千円です。', exampleReading: 'Sen\'en desu.', exampleEnglish: 'It is 1000 yen.', category: 'Numbers', level: 'N5' },
  { id: 'f132', japanese: '万', reading: 'man', english: 'Ten thousand', example: '一万円です。', exampleReading: 'Ichiman\'en desu.', exampleEnglish: 'It is 10,000 yen.', category: 'Numbers', level: 'N4' },

  // ==================== NOUNS - DAILY LIFE ====================
  { id: 'f140', japanese: '水', reading: 'mizu', english: 'Water', example: '水を飲みたいです。', exampleReading: 'Mizu wo nomitai desu.', exampleEnglish: 'I want to drink water.', category: 'Nouns', level: 'N5' },
  { id: 'f141', japanese: 'お茶', reading: 'ocha', english: 'Tea', example: 'お茶をどうぞ。', exampleReading: 'Ocha wo douzo.', exampleEnglish: 'Here is some tea.', category: 'Nouns', level: 'N5' },
  { id: 'f142', japanese: 'ご飯', reading: 'gohan', english: 'Rice / Meal', example: 'ご飯を食べましょう。', exampleReading: 'Gohan wo tabemashou.', exampleEnglish: 'Let\'s eat.', category: 'Nouns', level: 'N5' },
  { id: 'f143', japanese: '学校', reading: 'gakkou', english: 'School', example: '学校まで歩きます。', exampleReading: 'Gakkou made arukimasu.', exampleEnglish: 'I walk to school.', category: 'Nouns', level: 'N5' },
  { id: 'f144', japanese: '家', reading: 'ie', english: 'House / Home', example: '家に帰ります。', exampleReading: 'Ie ni kaerimasu.', exampleEnglish: 'I go back home.', category: 'Nouns', level: 'N5' },
  { id: 'f145', japanese: '友達', reading: 'tomodachi', english: 'Friend', example: '友達に会います。', exampleReading: 'Tomodachi ni aimasu.', exampleEnglish: 'I meet a friend.', category: 'Nouns', level: 'N5' },
  { id: 'f146', japanese: '先生', reading: 'sensei', english: 'Teacher', example: '先生に聞きました。', exampleReading: 'Sensei ni kikimashita.', exampleEnglish: 'I asked the teacher.', category: 'Nouns', level: 'N5' },
  { id: 'f147', japanese: '学生', reading: 'gakusei', english: 'Student', example: '私は学生です。', exampleReading: 'Watashi wa gakusei desu.', exampleEnglish: 'I am a student.', category: 'Nouns', level: 'N5' },
  { id: 'f148', japanese: '会社', reading: 'kaisha', english: 'Company', example: '会社に行きます。', exampleReading: 'Kaisha ni ikimasu.', exampleEnglish: 'I go to the company.', category: 'Nouns', level: 'N4' },
  { id: 'f149', japanese: '電車', reading: 'densha', english: 'Train', example: '電車で行きます。', exampleReading: 'Densha de ikimasu.', exampleEnglish: 'I go by train.', category: 'Nouns', level: 'N5' },
  { id: 'f150', japanese: '駅', reading: 'eki', english: 'Station', example: '駅はどこですか？', exampleReading: 'Eki wa doko desu ka?', exampleEnglish: 'Where is the station?', category: 'Nouns', level: 'N5' },
  { id: 'f151', japanese: '空港', reading: 'kuukou', english: 'Airport', example: '空港まで行ってください。', exampleReading: 'Kuukou made itte kudasai.', exampleEnglish: 'Please go to the airport.', category: 'Nouns', level: 'N4' },
  { id: 'f152', japanese: '病院', reading: 'byouin', english: 'Hospital', example: '病院に行きます。', exampleReading: 'Byouin ni ikimasu.', exampleEnglish: 'I go to the hospital.', category: 'Nouns', level: 'N5' },
  { id: 'f153', japanese: '店', reading: 'mise', english: 'Shop / Store', example: '店で買いました。', exampleReading: 'Mise de kaimashita.', exampleEnglish: 'I bought it at the store.', category: 'Nouns', level: 'N5' },
  { id: 'f154', japanese: 'レストラン', reading: 'resutoran', english: 'Restaurant', example: 'レストランで食べました。', exampleReading: 'Resutoran de tabemashita.', exampleEnglish: 'I ate at a restaurant.', category: 'Nouns', level: 'N5' },
  { id: 'f155', japanese: '本', reading: 'hon', english: 'Book', example: 'この本は面白いです。', exampleReading: 'Kono hon wa omoshiroi desu.', exampleEnglish: 'This book is interesting.', category: 'Nouns', level: 'N5' },
  { id: 'f156', japanese: '車', reading: 'kuruma', english: 'Car', example: '車を買いました。', exampleReading: 'Kuruma wo kaimashita.', exampleEnglish: 'I bought a car.', category: 'Nouns', level: 'N5' },
  { id: 'f157', japanese: '電話', reading: 'denwa', english: 'Phone', example: '電話をかけます。', exampleReading: 'Denwa wo kakemasu.', exampleEnglish: 'I make a phone call.', category: 'Nouns', level: 'N5' },
  { id: 'f158', japanese: 'お金', reading: 'okane', english: 'Money', example: 'お金がありません。', exampleReading: 'Okane ga arimasen.', exampleEnglish: 'I don\'t have money.', category: 'Nouns', level: 'N5' },
  { id: 'f159', japanese: '仕事', reading: 'shigoto', english: 'Work / Job', example: '仕事は忙しいです。', exampleReading: 'Shigoto wa isogashii desu.', exampleEnglish: 'Work is busy.', category: 'Nouns', level: 'N4' },

  // ==================== TIME ====================
  { id: 'f170', japanese: '今日', reading: 'kyou', english: 'Today', example: '今日はいい天気です。', exampleReading: 'Kyou wa ii tenki desu.', exampleEnglish: 'Today is good weather.', category: 'Time', level: 'N5' },
  { id: 'f171', japanese: '明日', reading: 'ashita', english: 'Tomorrow', example: '明日は休みです。', exampleReading: 'Ashita wa yasumi desu.', exampleEnglish: 'Tomorrow is a day off.', category: 'Time', level: 'N5' },
  { id: 'f172', japanese: '昨日', reading: 'kinou', english: 'Yesterday', example: '昨日は忙しかったです。', exampleReading: 'Kinou wa isogashikatta desu.', exampleEnglish: 'Yesterday was busy.', category: 'Time', level: 'N5' },
  { id: 'f173', japanese: '今', reading: 'ima', english: 'Now', example: '今、何時ですか？', exampleReading: 'Ima, nanji desu ka?', exampleEnglish: 'What time is it now?', category: 'Time', level: 'N5' },
  { id: 'f174', japanese: '朝', reading: 'asa', english: 'Morning', example: '朝ご飯を食べます。', exampleReading: 'Asagohan wo tabemasu.', exampleEnglish: 'I eat breakfast.', category: 'Time', level: 'N5' },
  { id: 'f175', japanese: '昼', reading: 'hiru', english: 'Daytime / Noon', example: '昼ご飯を食べます。', exampleReading: 'Hirugohan wo tabemasu.', exampleEnglish: 'I eat lunch.', category: 'Time', level: 'N5' },
  { id: 'f176', japanese: '夜', reading: 'yoru', english: 'Night', example: '夜は家にいます。', exampleReading: 'Yoru wa ie ni imasu.', exampleEnglish: 'I am at home at night.', category: 'Time', level: 'N5' },
  { id: 'f177', japanese: '毎日', reading: 'mainichi', english: 'Every day', example: '毎日日本語を勉強します。', exampleReading: 'Mainichi nihongo wo benkyou shimasu.', exampleEnglish: 'I study Japanese every day.', category: 'Time', level: 'N5' },
  { id: 'f178', japanese: '毎週', reading: 'maishuu', english: 'Every week', example: '毎週日曜日に会います。', exampleReading: 'Maishuu nichiyoubi ni aimasu.', exampleEnglish: 'We meet every Sunday.', category: 'Time', level: 'N4' },
  { id: 'f179', japanese: '来週', reading: 'raishuu', english: 'Next week', example: '来週は忙しいです。', exampleReading: 'Raishuu wa isogashii desu.', exampleEnglish: 'Next week is busy.', category: 'Time', level: 'N5' },
  { id: 'f180', japanese: '先週', reading: 'senshuu', english: 'Last week', example: '先週は楽しかったです。', exampleReading: 'Senshuu wa tanoshikatta desu.', exampleEnglish: 'Last week was fun.', category: 'Time', level: 'N5' },
  { id: 'f181', japanese: '今月', reading: 'kongetsu', english: 'This month', example: '今月は忙しいです。', exampleReading: 'Kongetsu wa isogashii desu.', exampleEnglish: 'This month is busy.', category: 'Time', level: 'N4' },
  { id: 'f182', japanese: '来年', reading: 'rainen', english: 'Next year', example: '来年日本に行きます。', exampleReading: 'Rainen nihon ni ikimasu.', exampleEnglish: 'I will go to Japan next year.', category: 'Time', level: 'N5' },

  // ==================== EXPRESSIONS ====================
  { id: 'f190', japanese: '大丈夫', reading: 'daijoubu', english: 'It\'s okay / I\'m fine', example: '大丈夫ですか？', exampleReading: 'Daijoubu desu ka?', exampleEnglish: 'Are you okay?', category: 'Expressions', level: 'N5' },
  { id: 'f191', japanese: 'ください', reading: 'kudasai', english: 'Please (give me)', example: 'これをください。', exampleReading: 'Kore wo kudasai.', exampleEnglish: 'Please give me this.', category: 'Expressions', level: 'N5' },
  { id: 'f192', japanese: 'どういたしまして', reading: 'douitashimashite', english: 'You\'re welcome', example: 'ありがとう。どういたしまして。', exampleReading: 'Arigatou. Douitashimashite.', exampleEnglish: 'Thank you. You\'re welcome.', category: 'Expressions', level: 'N5' },
  { id: 'f193', japanese: 'わかりました', reading: 'wakarimashita', english: 'I understand', example: 'はい、わかりました。', exampleReading: 'Hai, wakarimashita.', exampleEnglish: 'Yes, I understand.', category: 'Expressions', level: 'N5' },
  { id: 'f194', japanese: '知りません', reading: 'shirimasen', english: 'I don\'t know', example: 'その場所を知りません。', exampleReading: 'Sono basho wo shirimasen.', exampleEnglish: 'I don\'t know that place.', category: 'Expressions', level: 'N5' },
  { id: 'f195', japanese: 'お願いします', reading: 'onegaishimasu', english: 'Please (request)', example: 'これをお願いします。', exampleReading: 'Kore wo onegaishimasu.', exampleEnglish: 'Please do this.', category: 'Expressions', level: 'N5' },
  { id: 'f196', japanese: 'がんばります', reading: 'ganbarimasu', english: 'I\'ll do my best', example: '日本語をがんばります！', exampleReading: 'Nihongo wo ganbarimasu!', exampleEnglish: 'I\'ll do my best with Japanese!', category: 'Expressions', level: 'N5' },
  { id: 'f197', japanese: 'すごい', reading: 'sugoi', english: 'Amazing / Wow', example: 'すごいですね！', exampleReading: 'Sugoi desu ne!', exampleEnglish: 'That\'s amazing!', category: 'Expressions', level: 'N5' },
  { id: 'f198', japanese: 'かわいい', reading: 'kawaii', english: 'Cute', example: '猫はかわいいです。', exampleReading: 'Neko wa kawaii desu.', exampleEnglish: 'The cat is cute.', category: 'Expressions', level: 'N5' },
  { id: 'f199', japanese: 'おめでとう', reading: 'omedetou', english: 'Congratulations', example: 'お誕生日おめでとう！', exampleReading: 'Otanjoubi omedetou!', exampleEnglish: 'Happy birthday!', category: 'Expressions', level: 'N5' },
  { id: 'f200', japanese: 'いただきます', reading: 'itadakimasu', english: 'Let\'s eat (before meal)', example: 'いただきます！', exampleReading: 'Itadakimasu!', exampleEnglish: 'Let\'s eat!', category: 'Expressions', level: 'N5' },
  { id: 'f201', japanese: 'ごちそうさまでした', reading: 'gochisousama deshita', english: 'Thank you for the meal', example: 'ごちそうさまでした。', exampleReading: 'Gochisousama deshita.', exampleEnglish: 'Thank you for the meal.', category: 'Expressions', level: 'N5' },
  { id: 'f202', japanese: 'お疲れ様でした', reading: 'otsukaresama deshita', english: 'Good work / Thank you for your hard work', example: 'お疲れ様でした。', exampleReading: 'Otsukaresama deshita.', exampleEnglish: 'Thank you for your hard work.', category: 'Expressions', level: 'N4' },
  { id: 'f203', japanese: '残念です', reading: 'zannen desu', english: 'That\'s too bad / What a pity', example: 'それは残念です。', exampleReading: 'Sore wa zannen desu.', exampleEnglish: 'That\'s too bad.', category: 'Expressions', level: 'N4' },
  { id: 'f204', japanese: 'よかった', reading: 'yokatta', english: 'I\'m glad / That was good', example: 'よかったですね！', exampleReading: 'Yokatta desu ne!', exampleEnglish: 'I\'m glad!', category: 'Expressions', level: 'N5' },
  { id: 'f205', japanese: 'もちろんです', reading: 'mochiron desu', english: 'Of course', example: 'もちろんです！', exampleReading: 'Mochiron desu!', exampleEnglish: 'Of course!', category: 'Expressions', level: 'N4' },

  // ==================== FAMILY ====================
  { id: 'f210', japanese: '家族', reading: 'kazoku', english: 'Family', example: '家族が大好きです。', exampleReading: 'Kazoku ga daisuki desu.', exampleEnglish: 'I love my family.', category: 'Family', level: 'N5' },
  { id: 'f211', japanese: 'お母さん', reading: 'okaasan', english: 'Mother', example: 'お母さんは料理が上手です。', exampleReading: 'Okaasan wa ryouri ga jouzu desu.', exampleEnglish: 'My mother is good at cooking.', category: 'Family', level: 'N5' },
  { id: 'f212', japanese: 'お父さん', reading: 'otousan', english: 'Father', example: 'お父さんは会社員です。', exampleReading: 'Otousan wa kaishain desu.', exampleEnglish: 'My father is a company employee.', category: 'Family', level: 'N5' },
  { id: 'f213', japanese: 'お兄さん', reading: 'oniisan', english: 'Older brother', example: 'お兄さんは大学生です。', exampleReading: 'Oniisan wa daigakusei desu.', exampleEnglish: 'My older brother is a university student.', category: 'Family', level: 'N5' },
  { id: 'f214', japanese: 'お姉さん', reading: 'oneesan', english: 'Older sister', example: 'お姉さんは先生です。', exampleReading: 'Oneesan wa sensei desu.', exampleEnglish: 'My older sister is a teacher.', category: 'Family', level: 'N5' },
  { id: 'f215', japanese: '弟', reading: 'otouto', english: 'Younger brother', example: '弟は学生です。', exampleReading: 'Otouto wa gakusei desu.', exampleEnglish: 'My younger brother is a student.', category: 'Family', level: 'N5' },
  { id: 'f216', japanese: '妹', reading: 'imouto', english: 'Younger sister', example: '妹は高校生です。', exampleReading: 'Imouto wa koukousei desu.', exampleEnglish: 'My younger sister is a high school student.', category: 'Family', level: 'N5' },
  { id: 'f217', japanese: '子供', reading: 'kodomo', english: 'Child', example: '子供が三人います。', exampleReading: 'Kodomo ga sannin imasu.', exampleEnglish: 'I have three children.', category: 'Family', level: 'N5' },

  // ==================== BODY PARTS ====================
  { id: 'f220', japanese: '目', reading: 'me', english: 'Eye', example: '目が大きいです。', exampleReading: 'Me ga ookii desu.', exampleEnglish: 'My eyes are big.', category: 'Body', level: 'N5' },
  { id: 'f221', japanese: '耳', reading: 'mimi', english: 'Ear', example: '耳が痛いです。', exampleReading: 'Mimi ga itai desu.', exampleEnglish: 'My ear hurts.', category: 'Body', level: 'N5' },
  { id: 'f222', japanese: '口', reading: 'kuchi', english: 'Mouth', example: '口を開けてください。', exampleReading: 'Kuchi wo akete kudasai.', exampleEnglish: 'Please open your mouth.', category: 'Body', level: 'N5' },
  { id: 'f223', japanese: '鼻', reading: 'hana', english: 'Nose', example: '鼻が高いです。', exampleReading: 'Hana ga takai desu.', exampleEnglish: 'My nose is high.', category: 'Body', level: 'N5' },
  { id: 'f224', japanese: '手', reading: 'te', english: 'Hand', example: '手を洗ってください。', exampleReading: 'Te wo aratte kudasai.', exampleEnglish: 'Please wash your hands.', category: 'Body', level: 'N5' },
  { id: 'f225', japanese: '足', reading: 'ashi', english: 'Foot / Leg', example: '足が疲れました。', exampleReading: 'Ashi ga tsukaremashita.', exampleEnglish: 'My legs are tired.', category: 'Body', level: 'N5' },
  { id: 'f226', japanese: '頭', reading: 'atama', english: 'Head', example: '頭が痛いです。', exampleReading: 'Atama ga itai desu.', exampleEnglish: 'My head hurts.', category: 'Body', level: 'N5' },
  { id: 'f227', japanese: '心', reading: 'kokoro', english: 'Heart / Mind', example: '心が強いです。', exampleReading: 'Kokoro ga tsuyoi desu.', exampleEnglish: 'I have a strong heart.', category: 'Body', level: 'N4' },

  // ==================== FOOD ====================
  { id: 'f230', japanese: '肉', reading: 'niku', english: 'Meat', example: '肉が好きです。', exampleReading: 'Niku ga suki desu.', exampleEnglish: 'I like meat.', category: 'Food', level: 'N5' },
  { id: 'f231', japanese: '魚', reading: 'sakana', english: 'Fish', example: '魚を食べます。', exampleReading: 'Sakana wo tabemasu.', exampleEnglish: 'I eat fish.', category: 'Food', level: 'N5' },
  { id: 'f232', japanese: '野菜', reading: 'yasai', english: 'Vegetables', example: '野菜が嫌いです。', exampleReading: 'Yasai ga kirai desu.', exampleEnglish: 'I don\'t like vegetables.', category: 'Food', level: 'N5' },
  { id: 'f233', japanese: '果物', reading: 'kudamono', english: 'Fruit', example: '果物が好きです。', exampleReading: 'Kudamono ga suki desu.', exampleEnglish: 'I like fruits.', category: 'Food', level: 'N5' },
  { id: 'f234', japanese: '卵', reading: 'tamago', english: 'Egg', example: '卵を買います。', exampleReading: 'Tamago wo kaimasu.', exampleEnglish: 'I buy eggs.', category: 'Food', level: 'N5' },
  { id: 'f235', japanese: '牛乳', reading: 'gyuunyuu', english: 'Milk', example: '牛乳を飲みます。', exampleReading: 'Gyuunyuu wo nomimasu.', exampleEnglish: 'I drink milk.', category: 'Food', level: 'N5' },
  { id: 'f236', japanese: 'パン', reading: 'pan', english: 'Bread', example: '朝はパンを食べます。', exampleReading: 'Asa wa pan wo tabemasu.', exampleEnglish: 'I eat bread in the morning.', category: 'Food', level: 'N5' },
  { id: 'f237', japanese: 'ラーメン', reading: 'raamen', english: 'Ramen (noodles)', example: 'ラーメンが大好きです。', exampleReading: 'Raamen ga daisuki desu.', exampleEnglish: 'I love ramen.', category: 'Food', level: 'N5' },
  { id: 'f238', japanese: '寿司', reading: 'sushi', english: 'Sushi', example: '寿司を食べたことがあります。', exampleReading: 'Sushi wo tabeta koto ga arimasu.', exampleEnglish: 'I have eaten sushi.', category: 'Food', level: 'N5' },

  // ==================== FOOD (Extended) ====================
  { id: 'f239', japanese: '天ぷら', reading: 'tenpura', english: 'Tempura', example: '天ぷらが大好きです。', exampleReading: 'Tenpura ga daisuki desu.', exampleEnglish: 'I love tempura.', category: 'Food', level: 'N5' },
  { id: 'f240', japanese: 'うどん', reading: 'udon', english: 'Udon noodles', example: 'うどんを食べます。', exampleReading: 'Udon wo tabemasu.', exampleEnglish: 'I eat udon.', category: 'Food', level: 'N5' },
  { id: 'f241', japanese: 'そば', reading: 'soba', english: 'Soba noodles', example: 'そばが好きです。', exampleReading: 'Soba ga suki desu.', exampleEnglish: 'I like soba.', category: 'Food', level: 'N5' },
  { id: 'f242', japanese: 'おにぎり', reading: 'onigiri', english: 'Rice ball', example: 'おにぎりを買いました。', exampleReading: 'Onigiri wo kaimashita.', exampleEnglish: 'I bought a rice ball.', category: 'Food', level: 'N5' },
  { id: 'f243', japanese: '味噌汁', reading: 'misoshiru', english: 'Miso soup', example: '味噌汁を飲みます。', exampleReading: 'Misoshiru wo nomimasu.', exampleEnglish: 'I drink miso soup.', category: 'Food', level: 'N4' },

  // ==================== NATURE ====================
  { id: 'f250', japanese: '山', reading: 'yama', english: 'Mountain', example: '山に登ります。', exampleReading: 'Yama ni noborimasu.', exampleEnglish: 'I climb the mountain.', category: 'Nature', level: 'N5' },
  { id: 'f251', japanese: '川', reading: 'kawa', english: 'River', example: '川で泳ぎます。', exampleReading: 'Kawa de oyogimasu.', exampleEnglish: 'I swim in the river.', category: 'Nature', level: 'N5' },
  { id: 'f252', japanese: '海', reading: 'umi', english: 'Sea / Ocean', example: '海が見えます。', exampleReading: 'Umi ga miemasu.', exampleEnglish: 'I can see the sea.', category: 'Nature', level: 'N5' },
  { id: 'f253', japanese: '空', reading: 'sora', english: 'Sky', example: '空が青いです。', exampleReading: 'Sora ga aoi desu.', exampleEnglish: 'The sky is blue.', category: 'Nature', level: 'N5' },
  { id: 'f254', japanese: '花', reading: 'hana', english: 'Flower', example: '花がきれいです。', exampleReading: 'Hana ga kirei desu.', exampleEnglish: 'The flowers are beautiful.', category: 'Nature', level: 'N5' },
  { id: 'f255', japanese: '木', reading: 'ki', english: 'Tree', example: '木の下で休みます。', exampleReading: 'Ki no shita de yasumimasu.', exampleEnglish: 'I rest under the tree.', category: 'Nature', level: 'N5' },
  { id: 'f256', japanese: '雨', reading: 'ame', english: 'Rain', example: '雨が降っています。', exampleReading: 'Ame ga futteimasu.', exampleEnglish: 'It is raining.', category: 'Nature', level: 'N5' },
  { id: 'f257', japanese: '雪', reading: 'yuki', english: 'Snow', example: '雪が降りました。', exampleReading: 'Yuki ga furimashita.', exampleEnglish: 'It snowed.', category: 'Nature', level: 'N5' },
  { id: 'f258', japanese: '風', reading: 'kaze', english: 'Wind', example: '風が強いです。', exampleReading: 'Kaze ga tsuyoi desu.', exampleEnglish: 'The wind is strong.', category: 'Nature', level: 'N5' },
  { id: 'f259', japanese: '星', reading: 'hoshi', english: 'Star', example: '星が見えます。', exampleReading: 'Hoshi ga miemasu.', exampleEnglish: 'I can see stars.', category: 'Nature', level: 'N5' },

  // ==================== ANIMALS ====================
  { id: 'f260', japanese: '犬', reading: 'inu', english: 'Dog', example: '犬が好きです。', exampleReading: 'Inu ga suki desu.', exampleEnglish: 'I like dogs.', category: 'Animals', level: 'N5' },
  { id: 'f261', japanese: '猫', reading: 'neko', english: 'Cat', example: '猫がいます。', exampleReading: 'Neko ga imasu.', exampleEnglish: 'There is a cat.', category: 'Animals', level: 'N5' },
  { id: 'f262', japanese: '鳥', reading: 'tori', english: 'Bird', example: '鳥が飛んでいます。', exampleReading: 'Tori ga tondeimasu.', exampleEnglish: 'A bird is flying.', category: 'Animals', level: 'N5' },
  { id: 'f263', japanese: '魚', reading: 'sakana', english: 'Fish', example: '魚を釣りました。', exampleReading: 'Sakana wo tsurimashita.', exampleEnglish: 'I caught a fish.', category: 'Animals', level: 'N5' },
  { id: 'f264', japanese: '馬', reading: 'uma', english: 'Horse', example: '馬に乗ります。', exampleReading: 'Uma ni norimasu.', exampleEnglish: 'I ride a horse.', category: 'Animals', level: 'N5' },
  { id: 'f265', japanese: '牛', reading: 'ushi', english: 'Cow', example: '牛が草原にいます。', exampleReading: 'Ushi ga sougen ni imasu.', exampleEnglish: 'There are cows in the meadow.', category: 'Animals', level: 'N5' },

  // ==================== COLORS ====================
  { id: 'f270', japanese: '赤い', reading: 'akai', english: 'Red', example: 'りんごは赤いです。', exampleReading: 'Ringo wa akai desu.', exampleEnglish: 'Apples are red.', category: 'Colors', level: 'N5' },
  { id: 'f271', japanese: '青い', reading: 'aoi', english: 'Blue', example: '空が青いです。', exampleReading: 'Sora ga aoi desu.', exampleEnglish: 'The sky is blue.', category: 'Colors', level: 'N5' },
  { id: 'f272', japanese: '白い', reading: 'shiroi', english: 'White', example: '雪は白いです。', exampleReading: 'Yuki wa shiroi desu.', exampleEnglish: 'Snow is white.', category: 'Colors', level: 'N5' },
  { id: 'f273', japanese: '黒い', reading: 'kuroi', english: 'Black', example: 'この猫は黒いです。', exampleReading: 'Kono neko wa kuroi desu.', exampleEnglish: 'This cat is black.', category: 'Colors', level: 'N5' },
  { id: 'f274', japanese: '黄色い', reading: 'kiiroi', english: 'Yellow', example: 'バナナは黄色いです。', exampleReading: 'Banana wa kiiroi desu.', exampleEnglish: 'Bananas are yellow.', category: 'Colors', level: 'N5' },
  { id: 'f275', japanese: '緑', reading: 'midori', english: 'Green', example: '緑が好きです。', exampleReading: 'Midori ga suki desu.', exampleEnglish: 'I like green.', category: 'Colors', level: 'N5' },

  // ==================== WEATHER ====================
  { id: 'f280', japanese: '天気', reading: 'tenki', english: 'Weather', example: '天気がいいです。', exampleReading: 'Tenki ga ii desu.', exampleEnglish: 'The weather is good.', category: 'Weather', level: 'N5' },
  { id: 'f281', japanese: '晴れ', reading: 'hare', english: 'Sunny', example: '今日は晴れです。', exampleReading: 'Kyou wa hare desu.', exampleEnglish: 'Today is sunny.', category: 'Weather', level: 'N5' },
  { id: 'f282', japanese: '曇り', reading: 'kumori', english: 'Cloudy', example: '明日は曇りです。', exampleReading: 'Ashita wa kumori desu.', exampleEnglish: 'Tomorrow will be cloudy.', category: 'Weather', level: 'N5' },
  { id: 'f283', japanese: '涼しい', reading: 'suzushii', english: 'Cool', example: '秋は涼しいです。', exampleReading: 'Aki wa suzushii desu.', exampleEnglish: 'Autumn is cool.', category: 'Weather', level: 'N5' },
  { id: 'f284', japanese: '暖かい', reading: 'atatakai', english: 'Warm', example: '春は暖かいです。', exampleReading: 'Haru wa atatakai desu.', exampleEnglish: 'Spring is warm.', category: 'Weather', level: 'N5' },

  // ==================== SCHOOL ====================
  { id: 'f290', japanese: '教室', reading: 'kyoushitsu', english: 'Classroom', example: '教室に入ります。', exampleReading: 'Kyoushitsu ni hairimasu.', exampleEnglish: 'I enter the classroom.', category: 'School', level: 'N5' },
  { id: 'f291', japanese: '宿題', reading: 'shukudai', english: 'Homework', example: '宿題をしました。', exampleReading: 'Shukudai wo shimashita.', exampleEnglish: 'I did my homework.', category: 'School', level: 'N5' },
  { id: 'f292', japanese: '試験', reading: 'shiken', english: 'Exam / Test', example: '試験があります。', exampleReading: 'Shiken ga arimasu.', exampleEnglish: 'There is an exam.', category: 'School', level: 'N4' },
  { id: 'f293', japanese: '授業', reading: 'jugyou', english: 'Class / Lesson', example: '授業が始まります。', exampleReading: 'Jugyou ga hajimarimasu.', exampleEnglish: 'The class starts.', category: 'School', level: 'N4' },
  { id: 'f294', japanese: '鉛筆', reading: 'enpitsu', english: 'Pencil', example: '鉛筆を借りました。', exampleReading: 'Enpitsu wo karimashita.', exampleEnglish: 'I borrowed a pencil.', category: 'School', level: 'N5' },
  { id: 'f295', japanese: 'ノート', reading: 'nooto', english: 'Notebook', example: 'ノートを開きます。', exampleReading: 'Nooto wo hirakimasu.', exampleEnglish: 'I open the notebook.', category: 'School', level: 'N5' },

  // ==================== CLOTHING ====================
  { id: 'f300', japanese: '服', reading: 'fuku', english: 'Clothes', example: '服を買います。', exampleReading: 'Fuku wo kaimasu.', exampleEnglish: 'I buy clothes.', category: 'Clothing', level: 'N5' },
  { id: 'f301', japanese: '靴', reading: 'kutsu', english: 'Shoes', example: '靴を履きます。', exampleReading: 'Kutsu wo hakimasu.', exampleEnglish: 'I put on shoes.', category: 'Clothing', level: 'N5' },
  { id: 'f302', japanese: '帽子', reading: 'boushi', english: 'Hat', example: '帽子をかぶります。', exampleReading: 'Boushi wo kaburimasu.', exampleEnglish: 'I wear a hat.', category: 'Clothing', level: 'N5' },
  { id: 'f303', japanese: 'シャツ', reading: 'shatsu', english: 'Shirt', example: '白いシャツを着ます。', exampleReading: 'Shiroi shatsu wo kimasu.', exampleEnglish: 'I wear a white shirt.', category: 'Clothing', level: 'N5' },

  // ==================== SPORTS ====================
  { id: 'f310', japanese: 'スポーツ', reading: 'supootsu', english: 'Sports', example: 'スポーツが好きです。', exampleReading: 'Supootsu ga suki desu.', exampleEnglish: 'I like sports.', category: 'Sports', level: 'N5' },
  { id: 'f311', japanese: 'サッカー', reading: 'sakkaa', english: 'Soccer', example: 'サッカーをします。', exampleReading: 'Sakkaa wo shimasu.', exampleEnglish: 'I play soccer.', category: 'Sports', level: 'N5' },
  { id: 'f312', japanese: '野球', reading: 'yakyuu', english: 'Baseball', example: '野球を見ます。', exampleReading: 'Yakyuu wo mimasu.', exampleEnglish: 'I watch baseball.', category: 'Sports', level: 'N4' },
  { id: 'f313', japanese: '水泳', reading: 'suiei', english: 'Swimming', example: '水泳ができます。', exampleReading: 'Suiei ga dekimasu.', exampleEnglish: 'I can swim.', category: 'Sports', level: 'N4' },

  // ==================== LOCATIONS ====================
  { id: 'f320', japanese: '公園', reading: 'kouen', english: 'Park', example: '公園に行きます。', exampleReading: 'Kouen ni ikimasu.', exampleEnglish: 'I go to the park.', category: 'Locations', level: 'N5' },
  { id: 'f321', japanese: '銀行', reading: 'ginkou', english: 'Bank', example: '銀行はどこですか？', exampleReading: 'Ginkou wa doko desu ka?', exampleEnglish: 'Where is the bank?', category: 'Locations', level: 'N5' },
  { id: 'f322', japanese: '郵便局', reading: 'yuubinkyoku', english: 'Post office', example: '郵便局に行きます。', exampleReading: 'Yuubinkyoku ni ikimasu.', exampleEnglish: 'I go to the post office.', category: 'Locations', level: 'N5' },
  { id: 'f323', japanese: 'コンビニ', reading: 'konbini', english: 'Convenience store', example: 'コンビニで買います。', exampleReading: 'Konbini de kaimasu.', exampleEnglish: 'I buy it at the convenience store.', category: 'Locations', level: 'N5' },
  { id: 'f324', japanese: 'スーパー', reading: 'suupaa', english: 'Supermarket', example: 'スーパーに行きます。', exampleReading: 'Suupaa ni ikimasu.', exampleEnglish: 'I go to the supermarket.', category: 'Locations', level: 'N5' },
  { id: 'f325', japanese: '映画館', reading: 'eigakan', english: 'Movie theater', example: '映画館で見ます。', exampleReading: 'Eigakan de mimasu.', exampleEnglish: 'I watch at the movie theater.', category: 'Locations', level: 'N4' },

  // ==================== VERBS - EXTENDED ====================
  { id: 'f330', japanese: '教える', reading: 'oshieru', english: 'To teach', example: '日本語を教えます。', exampleReading: 'Nihongo wo oshiemasu.', exampleEnglish: 'I teach Japanese.', category: 'Verbs', level: 'N4' },
  { id: 'f331', japanese: '習う', reading: 'narau', english: 'To learn', example: 'ピアノを習っています。', exampleReading: 'Piano wo naratteimasu.', exampleEnglish: 'I am learning piano.', category: 'Verbs', level: 'N4' },
  { id: 'f332', japanese: '使う', reading: 'tsukau', english: 'To use', example: 'パソコンを使います。', exampleReading: 'Pasokon wo tsukaimasu.', exampleEnglish: 'I use a computer.', category: 'Verbs', level: 'N5' },
  { id: 'f333', japanese: '作る', reading: 'tsukuru', english: 'To make', example: '料理を作ります。', exampleReading: 'Ryouri wo tsukurimasu.', exampleEnglish: 'I make food.', category: 'Verbs', level: 'N5' },
  { id: 'f334', japanese: '住む', reading: 'sumu', english: 'To live', example: '東京に住んでいます。', exampleReading: 'Tokyo ni sundeimasu.', exampleEnglish: 'I live in Tokyo.', category: 'Verbs', level: 'N4' },
  { id: 'f335', japanese: '働く', reading: 'hataraku', english: 'To work', example: '会社で働きます。', exampleReading: 'Kaisha de hatarakimasu.', exampleEnglish: 'I work at a company.', category: 'Verbs', level: 'N4' },
  { id: 'f336', japanese: '遊ぶ', reading: 'asobu', english: 'To play', example: '友達と遊びます。', exampleReading: 'Tomodachi to asobimasu.', exampleEnglish: 'I play with friends.', category: 'Verbs', level: 'N5' },
  { id: 'f337', japanese: '休む', reading: 'yasumu', english: 'To rest', example: '少し休みましょう。', exampleReading: 'Sukoshi yasumimashou.', exampleEnglish: 'Let\'s rest a little.', category: 'Verbs', level: 'N5' },
  { id: 'f338', japanese: '持つ', reading: 'motsu', english: 'To hold / have', example: '荷物を持ちます。', exampleReading: 'Nimotsu wo mochimasu.', exampleEnglish: 'I hold the luggage.', category: 'Verbs', level: 'N5' },
  { id: 'f339', japanese: '分かる', reading: 'wakaru', english: 'To understand', example: '日本語が分かります。', exampleReading: 'Nihongo ga wakarimasu.', exampleEnglish: 'I understand Japanese.', category: 'Verbs', level: 'N5' },
  { id: 'f340', japanese: 'ある', reading: 'aru', english: 'To exist (inanimate)', example: '本があります。', exampleReading: 'Hon ga arimasu.', exampleEnglish: 'There is a book.', category: 'Verbs', level: 'N5' },
  { id: 'f341', japanese: 'いる', reading: 'iru', english: 'To exist (animate)', example: '猫がいます。', exampleReading: 'Neko ga imasu.', exampleEnglish: 'There is a cat.', category: 'Verbs', level: 'N5' },

  // ==================== ADJECTIVES - EXTENDED ====================
  { id: 'f350', japanese: '嬉しい', reading: 'ureshii', english: 'Happy / Glad', example: 'とても嬉しいです。', exampleReading: 'Totemo ureshii desu.', exampleEnglish: 'I am very happy.', category: 'Adjectives', level: 'N5' },
  { id: 'f351', japanese: '悲しい', reading: 'kanashii', english: 'Sad', example: '悲しい話です。', exampleReading: 'Kanashii hanashi desu.', exampleEnglish: 'It is a sad story.', category: 'Adjectives', level: 'N5' },
  { id: 'f352', japanese: '面白い', reading: 'omoshiroi', english: 'Interesting', example: 'この本は面白いです。', exampleReading: 'Kono hon wa omoshiroi desu.', exampleEnglish: 'This book is interesting.', category: 'Adjectives', level: 'N5' },
  { id: 'f353', japanese: '有名', reading: 'yuumei', english: 'Famous', example: '有名な場所です。', exampleReading: 'Yuumei na basho desu.', exampleEnglish: 'It is a famous place.', category: 'Adjectives', level: 'N4' },
  { id: 'f354', japanese: '便利', reading: 'benri', english: 'Convenient', example: 'コンビニは便利です。', exampleReading: 'Konbini wa benri desu.', exampleEnglish: 'Convenience stores are convenient.', category: 'Adjectives', level: 'N4' },
  { id: 'f355', japanese: '親切', reading: 'shinsetsu', english: 'Kind', example: '彼は親切です。', exampleReading: 'Kare wa shinsetsu desu.', exampleEnglish: 'He is kind.', category: 'Adjectives', level: 'N4' },
  { id: 'f356', japanese: '元気', reading: 'genki', english: 'Healthy / Energetic', example: 'お元気ですか？', exampleReading: 'Ogenki desu ka?', exampleEnglish: 'How are you?', category: 'Adjectives', level: 'N5' },
  { id: 'f357', japanese: '静か', reading: 'shizuka', english: 'Quiet', example: 'この部屋は静かです。', exampleReading: 'Kono heya wa shizuka desu.', exampleEnglish: 'This room is quiet.', category: 'Adjectives', level: 'N4' },
  { id: 'f358', japanese: '賑やか', reading: 'nigiyaka', english: 'Lively', example: '賑やかな街です。', exampleReading: 'Nigiyaka na machi desu.', exampleEnglish: 'It is a lively town.', category: 'Adjectives', level: 'N4' },
  { id: 'f359', japanese: '大変', reading: 'taihen', english: 'Very / Tough', example: '大変ですね。', exampleReading: 'Taihen desu ne.', exampleEnglish: 'That\'s tough.', category: 'Adjectives', level: 'N4' },
];

// Extended Quiz Questions - 100+ questions
export const quizQuestions: QuizQuestion[] = [
  // ==================== GREETINGS ====================
  { id: 'q1', type: 'multiple-choice', question: 'What does "こんにちは" mean?', options: ['Good morning', 'Hello', 'Goodbye', 'Good night'], correctAnswer: 'Hello', category: 'Greetings', difficulty: 'easy' },
  { id: 'q2', type: 'multiple-choice', question: 'How do you say "Thank you" in Japanese?', options: ['すみません', 'ありがとう', 'さようなら', 'こんにちは'], correctAnswer: 'ありがとう', category: 'Greetings', difficulty: 'easy' },
  { id: 'q3', type: 'multiple-choice', question: 'What does "おはようございます" mean?', options: ['Good evening', 'Good night', 'Good morning', 'Hello'], correctAnswer: 'Good morning', category: 'Greetings', difficulty: 'easy' },
  { id: 'q4', type: 'multiple-choice', question: 'How do you say "Goodbye" in Japanese?', options: ['こんにちは', 'ありがとう', 'さようなら', 'すみません'], correctAnswer: 'さようなら', category: 'Greetings', difficulty: 'easy' },
  { id: 'q5', type: 'multiple-choice', question: 'What does "こんばんは" mean?', options: ['Good morning', 'Good afternoon', 'Good evening', 'Good night'], correctAnswer: 'Good evening', category: 'Greetings', difficulty: 'easy' },
  { id: 'q6', type: 'multiple-choice', question: 'How do you say "Nice to meet you" in Japanese?', options: ['はじめまして', 'ありがとうございます', 'さようなら', 'お元気ですか'], correctAnswer: 'はじめまして', category: 'Greetings', difficulty: 'medium' },
  { id: 'q7', type: 'multiple-choice', question: 'What does "お元気ですか" mean?', options: ['Hello', 'How are you?', 'Goodbye', 'Thank you'], correctAnswer: 'How are you?', category: 'Greetings', difficulty: 'easy' },
  { id: 'q8', type: 'multiple-choice', question: 'How do you say "Good night" in Japanese?', options: ['おはようございます', 'こんばんは', 'お休みなさい', 'さようなら'], correctAnswer: 'お休みなさい', category: 'Greetings', difficulty: 'easy' },
  { id: 'q9', type: 'multiple-choice', question: 'What does "いってらっしゃい" mean?', options: ['Welcome home', 'Have a good day', 'Good night', 'Hello'], correctAnswer: 'Have a good day', category: 'Greetings', difficulty: 'medium' },
  { id: 'q10', type: 'multiple-choice', question: 'How do you say "Welcome home" in Japanese?', options: ['ただいま', 'いってらっしゃい', 'おかえりなさい', 'こんにちは'], correctAnswer: 'おかえりなさい', category: 'Greetings', difficulty: 'medium' },

  // ==================== NUMBERS ====================
  { id: 'q20', type: 'matching', question: 'What number is "一" (ichi)?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'One', category: 'Numbers', difficulty: 'easy' },
  { id: 'q21', type: 'matching', question: 'What number is "二" (ni)?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Two', category: 'Numbers', difficulty: 'easy' },
  { id: 'q22', type: 'matching', question: 'What number is "三" (san)?', options: ['One', 'Two', 'Three', 'Four'], correctAnswer: 'Three', category: 'Numbers', difficulty: 'easy' },
  { id: 'q23', type: 'matching', question: 'What number is "四" (yon/shi)?', options: ['Three', 'Four', 'Five', 'Six'], correctAnswer: 'Four', category: 'Numbers', difficulty: 'easy' },
  { id: 'q24', type: 'matching', question: 'What number is "五" (go)?', options: ['Four', 'Five', 'Six', 'Seven'], correctAnswer: 'Five', category: 'Numbers', difficulty: 'easy' },
  { id: 'q25', type: 'matching', question: 'What number is "十" (juu)?', options: ['Eight', 'Nine', 'Ten', 'Eleven'], correctAnswer: 'Ten', category: 'Numbers', difficulty: 'easy' },
  { id: 'q26', type: 'multiple-choice', question: 'How do you say "100 yen" in Japanese?', options: ['十円', '百円', '千円', '一万円'], correctAnswer: '百円', category: 'Numbers', difficulty: 'medium' },
  { id: 'q27', type: 'multiple-choice', question: 'What does "千円" mean?', options: ['100 yen', '1000 yen', '10,000 yen', '1 yen'], correctAnswer: '1000 yen', category: 'Numbers', difficulty: 'medium' },

  // ==================== VERBS ====================
  { id: 'q30', type: 'multiple-choice', question: 'What does "食べる" mean?', options: ['To drink', 'To eat', 'To sleep', 'To run'], correctAnswer: 'To eat', category: 'Verbs', difficulty: 'easy' },
  { id: 'q31', type: 'multiple-choice', question: 'What does "飲む" mean?', options: ['To eat', 'To drink', 'To sleep', 'To walk'], correctAnswer: 'To drink', category: 'Verbs', difficulty: 'easy' },
  { id: 'q32', type: 'multiple-choice', question: 'What does "行く" mean?', options: ['To come', 'To go', 'To return', 'To walk'], correctAnswer: 'To go', category: 'Verbs', difficulty: 'easy' },
  { id: 'q33', type: 'multiple-choice', question: 'What does "来る" mean?', options: ['To go', 'To come', 'To leave', 'To enter'], correctAnswer: 'To come', category: 'Verbs', difficulty: 'easy' },
  { id: 'q34', type: 'multiple-choice', question: 'What does "見る" mean?', options: ['To hear', 'To see/watch', 'To speak', 'To write'], correctAnswer: 'To see/watch', category: 'Verbs', difficulty: 'easy' },
  { id: 'q35', type: 'multiple-choice', question: 'What does "聞く" mean?', options: ['To speak', 'To listen/ask', 'To read', 'To write'], correctAnswer: 'To listen/ask', category: 'Verbs', difficulty: 'easy' },
  { id: 'q36', type: 'multiple-choice', question: 'What does "読む" mean?', options: ['To write', 'To read', 'To speak', 'To listen'], correctAnswer: 'To read', category: 'Verbs', difficulty: 'easy' },
  { id: 'q37', type: 'multiple-choice', question: 'What does "書く" mean?', options: ['To read', 'To write', 'To draw', 'To type'], correctAnswer: 'To write', category: 'Verbs', difficulty: 'easy' },
  { id: 'q38', type: 'multiple-choice', question: 'What does "寝る" mean?', options: ['To wake up', 'To sleep', 'To rest', 'To dream'], correctAnswer: 'To sleep', category: 'Verbs', difficulty: 'easy' },
  { id: 'q39', type: 'multiple-choice', question: 'What does "起きる" mean?', options: ['To sleep', 'To wake up', 'To stand', 'To sit'], correctAnswer: 'To wake up', category: 'Verbs', difficulty: 'easy' },
  { id: 'q40', type: 'multiple-choice', question: 'What does "話す" mean?', options: ['To listen', 'To speak', 'To read', 'To write'], correctAnswer: 'To speak', category: 'Verbs', difficulty: 'easy' },
  { id: 'q41', type: 'multiple-choice', question: 'What does "買う" mean?', options: ['To sell', 'To buy', 'To make', 'To give'], correctAnswer: 'To buy', category: 'Verbs', difficulty: 'easy' },
  { id: 'q42', type: 'multiple-choice', question: 'What does "勉強する" mean?', options: ['To work', 'To study', 'To play', 'To teach'], correctAnswer: 'To study', category: 'Verbs', difficulty: 'medium' },
  { id: 'q43', type: 'multiple-choice', question: 'How do you say "to work" in Japanese?', options: ['勉強する', '仕事する', '料理する', '旅行する'], correctAnswer: '仕事する', category: 'Verbs', difficulty: 'medium' },

  // ==================== NOUNS ====================
  { id: 'q50', type: 'multiple-choice', question: 'How do you say "water" in Japanese?', options: ['お茶', '水', '牛乳', 'ジュース'], correctAnswer: '水', category: 'Nouns', difficulty: 'easy' },
  { id: 'q51', type: 'multiple-choice', question: 'What does "友達" mean?', options: ['Teacher', 'Student', 'Friend', 'Family'], correctAnswer: 'Friend', category: 'Nouns', difficulty: 'easy' },
  { id: 'q52', type: 'multiple-choice', question: 'What does "先生" mean?', options: ['Doctor', 'Teacher', 'Student', 'Worker'], correctAnswer: 'Teacher', category: 'Nouns', difficulty: 'easy' },
  { id: 'q53', type: 'multiple-choice', question: 'How do you say "school" in Japanese?', options: ['家', '学校', '会社', '病院'], correctAnswer: '学校', category: 'Nouns', difficulty: 'easy' },
  { id: 'q54', type: 'multiple-choice', question: 'What does "家" mean?', options: ['School', 'Company', 'House/Home', 'Hospital'], correctAnswer: 'House/Home', category: 'Nouns', difficulty: 'easy' },
  { id: 'q55', type: 'multiple-choice', question: 'How do you say "train" in Japanese?', options: ['車', 'バス', '電車', '飛行機'], correctAnswer: '電車', category: 'Nouns', difficulty: 'easy' },
  { id: 'q56', type: 'multiple-choice', question: 'What does "駅" mean?', options: ['Airport', 'Station', 'Port', 'Bus stop'], correctAnswer: 'Station', category: 'Nouns', difficulty: 'easy' },
  { id: 'q57', type: 'multiple-choice', question: 'How do you say "book" in Japanese?', options: ['本', '新聞', '雑誌', '手紙'], correctAnswer: '本', category: 'Nouns', difficulty: 'easy' },
  { id: 'q58', type: 'multiple-choice', question: 'What does "お金" mean?', options: ['Time', 'Money', 'Gold', 'Card'], correctAnswer: 'Money', category: 'Nouns', difficulty: 'easy' },
  { id: 'q59', type: 'multiple-choice', question: 'How do you say "restaurant" in Japanese?', options: ['店', 'レストラン', 'カフェ', '食堂'], correctAnswer: 'レストラン', category: 'Nouns', difficulty: 'easy' },

  // ==================== ADJECTIVES ====================
  { id: 'q60', type: 'multiple-choice', question: 'What does "大きい" mean?', options: ['Small', 'Big', 'New', 'Old'], correctAnswer: 'Big', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q61', type: 'multiple-choice', question: 'What does "小さい" mean?', options: ['Big', 'Small', 'Tall', 'Short'], correctAnswer: 'Small', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q62', type: 'multiple-choice', question: 'What does "新しい" mean?', options: ['Old', 'New', 'Young', 'Fresh'], correctAnswer: 'New', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q63', type: 'multiple-choice', question: 'What does "暑い" mean?', options: ['Cold (weather)', 'Hot (weather)', 'Warm', 'Cool'], correctAnswer: 'Hot (weather)', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q64', type: 'multiple-choice', question: 'What does "寒い" mean?', options: ['Hot (weather)', 'Cold (weather)', 'Cool', 'Warm'], correctAnswer: 'Cold (weather)', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q65', type: 'multiple-choice', question: 'What does "高い" mean?', options: ['Low', 'High/Expensive', 'Cheap', 'Short'], correctAnswer: 'High/Expensive', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q66', type: 'multiple-choice', question: 'What does "安い" mean?', options: ['Expensive', 'Cheap', 'High', 'Low'], correctAnswer: 'Cheap', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q67', type: 'multiple-choice', question: 'What does "忙しい" mean?', options: ['Free', 'Busy', 'Tired', 'Hungry'], correctAnswer: 'Busy', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q68', type: 'multiple-choice', question: 'What does "難しい" mean?', options: ['Easy', 'Difficult', 'Simple', 'Hard'], correctAnswer: 'Difficult', category: 'Adjectives', difficulty: 'easy' },
  { id: 'q69', type: 'multiple-choice', question: 'What does "楽しい" mean?', options: ['Sad', 'Fun', 'Boring', 'Interesting'], correctAnswer: 'Fun', category: 'Adjectives', difficulty: 'easy' },

  // ==================== TIME ====================
  { id: 'q70', type: 'multiple-choice', question: 'How do you say "today" in Japanese?', options: ['明日', '昨日', '今日', '今'], correctAnswer: '今日', category: 'Time', difficulty: 'easy' },
  { id: 'q71', type: 'multiple-choice', question: 'How do you say "tomorrow" in Japanese?', options: ['今日', '明日', '昨日', '来週'], correctAnswer: '明日', category: 'Time', difficulty: 'easy' },
  { id: 'q72', type: 'multiple-choice', question: 'How do you say "yesterday" in Japanese?', options: ['今日', '明日', '昨日', '先週'], correctAnswer: '昨日', category: 'Time', difficulty: 'easy' },
  { id: 'q73', type: 'multiple-choice', question: 'What does "今" mean?', options: ['Today', 'Now', 'Here', 'This'], correctAnswer: 'Now', category: 'Time', difficulty: 'easy' },
  { id: 'q74', type: 'multiple-choice', question: 'What does "毎日" mean?', options: ['Every week', 'Every day', 'Every month', 'Every year'], correctAnswer: 'Every day', category: 'Time', difficulty: 'easy' },
  { id: 'q75', type: 'multiple-choice', question: 'What does "来週" mean?', options: ['This week', 'Next week', 'Last week', 'Every week'], correctAnswer: 'Next week', category: 'Time', difficulty: 'easy' },
  { id: 'q76', type: 'multiple-choice', question: 'What does "朝" mean?', options: ['Morning', 'Afternoon', 'Evening', 'Night'], correctAnswer: 'Morning', category: 'Time', difficulty: 'easy' },
  { id: 'q77', type: 'multiple-choice', question: 'What does "夜" mean?', options: ['Morning', 'Afternoon', 'Evening', 'Night'], correctAnswer: 'Night', category: 'Time', difficulty: 'easy' },

  // ==================== EXPRESSIONS ====================
  { id: 'q80', type: 'multiple-choice', question: 'What does "大丈夫" mean?', options: ['It\'s okay/I\'m fine', 'It\'s difficult', 'It\'s interesting', 'It\'s expensive'], correctAnswer: 'It\'s okay/I\'m fine', category: 'Expressions', difficulty: 'easy' },
  { id: 'q81', type: 'multiple-choice', question: 'How do you say "I understand" in Japanese?', options: ['わかりません', 'わかりました', '知りません', '大丈夫です'], correctAnswer: 'わかりました', category: 'Expressions', difficulty: 'easy' },
  { id: 'q82', type: 'multiple-choice', question: 'How do you say "I don\'t know" in Japanese?', options: ['わかりません', '知りません', '大丈夫です', 'ください'], correctAnswer: '知りません', category: 'Expressions', difficulty: 'medium' },
  { id: 'q83', type: 'multiple-choice', question: 'What does "お願いします" mean?', options: ['Thank you', 'Please (request)', 'Excuse me', 'I\'m sorry'], correctAnswer: 'Please (request)', category: 'Expressions', difficulty: 'easy' },
  { id: 'q84', type: 'multiple-choice', question: 'What does "すごい" mean?', options: ['Bad', 'Amazing/Wow', 'Good', 'Difficult'], correctAnswer: 'Amazing/Wow', category: 'Expressions', difficulty: 'easy' },
  { id: 'q85', type: 'multiple-choice', question: 'How do you say "Congratulations" in Japanese?', options: ['おめでとう', 'ありがとう', 'すごい', 'がんばって'], correctAnswer: 'おめでとう', category: 'Expressions', difficulty: 'medium' },
  { id: 'q86', type: 'multiple-choice', question: 'What does "がんばります" mean?', options: ['I\'m tired', 'I\'ll do my best', 'I\'m busy', 'I\'m fine'], correctAnswer: 'I\'ll do my best', category: 'Expressions', difficulty: 'easy' },
  { id: 'q87', type: 'multiple-choice', question: 'What does "いただきます" mean?', options: ['Goodbye', 'Thank you', 'Let\'s eat (before meal)', 'Thank you for the meal'], correctAnswer: 'Let\'s eat (before meal)', category: 'Expressions', difficulty: 'medium' },

  // ==================== FILL IN THE BLANK ====================
  { id: 'q90', type: 'fill-blank', question: '_____は学生です。(I am a student.)', questionReading: '_____ wa gakusei desu.', correctAnswer: '私', explanation: '私 (watashi) means "I"', category: 'Grammar', difficulty: 'easy' },
  { id: 'q91', type: 'fill-blank', question: '水を_____ます。(I drink water.)', questionReading: 'Mizu wo _____masu.', correctAnswer: '飲み', explanation: '飲み (nomi) is the stem form of 飲む (nomu) - to drink', category: 'Grammar', difficulty: 'medium' },
  { id: 'q92', type: 'fill-blank', question: 'これを_____。(Please give me this.)', questionReading: 'Kore wo _____.', correctAnswer: 'ください', explanation: 'ください (kudasai) means "please give me"', category: 'Grammar', difficulty: 'easy' },
  { id: 'q93', type: 'fill-blank', question: 'お_____ございます。(Good morning.)', correctAnswer: 'はよう', explanation: 'おはようございます (ohayou gozaimasu) means "good morning"', category: 'Greetings', difficulty: 'easy' },
  { id: 'q94', type: 'fill-blank', question: '_____は何時ですか。(What time is it now?)', correctReading: '_____ wa nanji desu ka.', correctAnswer: '今', explanation: '今 (ima) means "now"', category: 'Grammar', difficulty: 'easy' },
  { id: 'q95', type: 'fill-blank', question: '_____に行きます。(I go to school.)', questionReading: '_____ ni ikimasu.', correctAnswer: '学校', explanation: '学校 (gakkou) means "school"', category: 'Grammar', difficulty: 'easy' },
  { id: 'q96', type: 'fill-blank', question: 'これは_____ですか。(What is this?)', questionReading: 'Kore wa _____ desu ka.', correctAnswer: '何', explanation: '何 (nani) means "what"', category: 'Grammar', difficulty: 'easy' },
  { id: 'q97', type: 'fill-blank', question: '_____です。(I understand.)', correctAnswer: 'わかりました', explanation: 'わかりました (wakarimashita) means "I understand"', category: 'Expressions', difficulty: 'easy' },
  { id: 'q98', type: 'fill-blank', question: 'お_____なさい。(Good night.)', correctAnswer: '休み', explanation: 'お休みなさい (oyasuminasai) means "good night"', category: 'Greetings', difficulty: 'easy' },
  { id: 'q99', type: 'fill-blank', question: '_____が好きです。(I like cats.)', questionReading: '_____ ga suki desu.', correctAnswer: '猫', explanation: '猫 (neko) means "cat"', category: 'Grammar', difficulty: 'medium' },

  // ==================== TRANSLATION ====================
  { id: 'q100', type: 'translation', question: 'Translate to English: "おはようございます"', correctAnswer: 'Good morning', category: 'Translation', difficulty: 'easy' },
  { id: 'q101', type: 'translation', question: 'Translate to English: "ありがとうございます"', correctAnswer: 'Thank you very much', category: 'Translation', difficulty: 'easy' },
  { id: 'q102', type: 'translation', question: 'Translate to Japanese: "How are you?"', correctAnswer: 'お元気ですか', category: 'Translation', difficulty: 'medium' },
  { id: 'q103', type: 'translation', question: 'Translate to Japanese: "I am a student"', correctAnswer: '私は学生です', category: 'Translation', difficulty: 'medium' },
  { id: 'q104', type: 'translation', question: 'Translate to English: "すみません"', correctAnswer: 'Excuse me', category: 'Translation', difficulty: 'easy' },
  { id: 'q105', type: 'translation', question: 'Translate to Japanese: "Goodbye"', correctAnswer: 'さようなら', category: 'Translation', difficulty: 'easy' },

  // ==================== FAMILY ====================
  { id: 'q110', type: 'multiple-choice', question: 'What does "お母さん" mean?', options: ['Father', 'Mother', 'Sister', 'Brother'], correctAnswer: 'Mother', category: 'Family', difficulty: 'easy' },
  { id: 'q111', type: 'multiple-choice', question: 'What does "お父さん" mean?', options: ['Mother', 'Father', 'Uncle', 'Grandfather'], correctAnswer: 'Father', category: 'Family', difficulty: 'easy' },
  { id: 'q112', type: 'multiple-choice', question: 'How do you say "family" in Japanese?', options: ['友達', '家族', '子供', '先生'], correctAnswer: '家族', category: 'Family', difficulty: 'easy' },
  { id: 'q113', type: 'multiple-choice', question: 'What does "弟" mean?', options: ['Older brother', 'Younger brother', 'Older sister', 'Younger sister'], correctAnswer: 'Younger brother', category: 'Family', difficulty: 'medium' },
  { id: 'q114', type: 'multiple-choice', question: 'What does "妹" mean?', options: ['Older sister', 'Younger sister', 'Older brother', 'Younger brother'], correctAnswer: 'Younger sister', category: 'Family', difficulty: 'medium' },

  // ==================== FOOD ====================
  { id: 'q120', type: 'multiple-choice', question: 'What does "肉" mean?', options: ['Fish', 'Meat', 'Vegetable', 'Fruit'], correctAnswer: 'Meat', category: 'Food', difficulty: 'easy' },
  { id: 'q121', type: 'multiple-choice', question: 'What does "魚" mean?', options: ['Meat', 'Fish', 'Rice', 'Bread'], correctAnswer: 'Fish', category: 'Food', difficulty: 'easy' },
  { id: 'q122', type: 'multiple-choice', question: 'How do you say "vegetables" in Japanese?', options: ['果物', '野菜', '肉', '魚'], correctAnswer: '野菜', category: 'Food', difficulty: 'easy' },
  { id: 'q123', type: 'multiple-choice', question: 'What does "寿司" mean?', options: ['Ramen', 'Sushi', 'Tempura', 'Sashimi'], correctAnswer: 'Sushi', category: 'Food', difficulty: 'easy' },
  { id: 'q124', type: 'multiple-choice', question: 'How do you say "milk" in Japanese?', options: ['水', 'お茶', '牛乳', 'ジュース'], correctAnswer: '牛乳', category: 'Food', difficulty: 'easy' },

  // ==================== BODY ====================
  { id: 'q130', type: 'multiple-choice', question: 'What does "目" mean?', options: ['Ear', 'Eye', 'Nose', 'Mouth'], correctAnswer: 'Eye', category: 'Body', difficulty: 'easy' },
  { id: 'q131', type: 'multiple-choice', question: 'What does "耳" mean?', options: ['Eye', 'Ear', 'Nose', 'Mouth'], correctAnswer: 'Ear', category: 'Body', difficulty: 'easy' },
  { id: 'q132', type: 'multiple-choice', question: 'How do you say "hand" in Japanese?', options: ['足', '手', '頭', '心'], correctAnswer: '手', category: 'Body', difficulty: 'easy' },
  { id: 'q133', type: 'multiple-choice', question: 'What does "頭" mean?', options: ['Hand', 'Foot', 'Head', 'Heart'], correctAnswer: 'Head', category: 'Body', difficulty: 'easy' },
];

// Conversation Scenarios
export const conversationScenarios: ConversationScenario[] = [
  {
    id: 'c1',
    title: 'At the Cafe',
    titleJp: 'カフェで',
    description: 'Order drinks and food at a Japanese cafe',
    icon: '☕',
    level: 'beginner',
    prompts: [
      'I want to order a coffee',
      'Ask about the menu recommendations',
      'Request the check',
      'Ask if they have wifi'
    ]
  },
  {
    id: 'c2',
    title: 'Meeting Friends',
    titleJp: '友達と会う',
    description: 'Casual conversation with Japanese friends',
    icon: '👋',
    level: 'beginner',
    prompts: [
      'Greet your friend and ask how they are',
      'Talk about your weekend plans',
      'Suggest going somewhere together',
      'Say goodbye and make plans to meet again'
    ]
  },
  {
    id: 'c3',
    title: 'Shopping',
    titleJp: '買い物',
    description: 'Shopping at a store in Japan',
    icon: '🛍️',
    level: 'beginner',
    prompts: [
      'Ask about the price of an item',
      'Ask if they have a different size or color',
      'Ask where to pay',
      'Ask if they accept credit cards'
    ]
  },
  {
    id: 'c4',
    title: 'At the Restaurant',
    titleJp: 'レストランで',
    description: 'Order food and interact with restaurant staff',
    icon: '🍜',
    level: 'intermediate',
    prompts: [
      'Ask for a table for two',
      'Ask about the daily special',
      'Request utensils or condiments',
      'Compliment the food'
    ]
  },
  {
    id: 'c5',
    title: 'Asking Directions',
    titleJp: '道を聞く',
    description: 'Navigate and ask for directions in Japan',
    icon: '🗺️',
    level: 'intermediate',
    prompts: [
      'Ask where the nearest station is',
      'Ask for directions to a specific place',
      'Confirm if you\'re going the right way',
      'Thank someone for their help'
    ]
  },
  {
    id: 'c6',
    title: 'At Work',
    titleJp: '仕事で',
    description: 'Professional conversations in a Japanese workplace',
    icon: '💼',
    level: 'advanced',
    prompts: [
      'Introduce yourself to colleagues',
      'Ask about a project deadline',
      'Request time off',
      'Express agreement or disagreement politely'
    ]
  }
];

// Voice Practice Phrases
export const voicePhrases: VoicePhrase[] = [
  // Greetings
  { id: 'v1', japanese: 'こんにちは', reading: 'konnichiwa', english: 'Hello', category: 'greetings', difficulty: 1 },
  { id: 'v2', japanese: 'おはようございます', reading: 'ohayou gozaimasu', english: 'Good morning', category: 'greetings', difficulty: 2 },
  { id: 'v3', japanese: 'こんばんは', reading: 'konbanwa', english: 'Good evening', category: 'greetings', difficulty: 1 },
  { id: 'v4', japanese: 'さようなら', reading: 'sayounara', english: 'Goodbye', category: 'greetings', difficulty: 1 },
  { id: 'v5', japanese: 'お元気ですか', reading: 'ogenki desu ka', english: 'How are you?', category: 'greetings', difficulty: 2 },
  
  // Numbers
  { id: 'v6', japanese: '一、二、三', reading: 'ichi, ni, san', english: 'One, two, three', category: 'numbers', difficulty: 1 },
  { id: 'v7', japanese: '四、五、六', reading: 'yon, go, roku', english: 'Four, five, six', category: 'numbers', difficulty: 1 },
  { id: 'v8', japanese: '七、八、九、十', reading: 'nana, hachi, kyuu, juu', english: 'Seven, eight, nine, ten', category: 'numbers', difficulty: 2 },
  
  // Daily Phrases
  { id: 'v9', japanese: 'ありがとうございます', reading: 'arigatou gozaimasu', english: 'Thank you very much', category: 'daily', difficulty: 2 },
  { id: 'v10', japanese: 'すみません', reading: 'sumimasen', english: 'Excuse me / I\'m sorry', category: 'daily', difficulty: 1 },
  { id: 'v11', japanese: 'いただきます', reading: 'itadakimasu', english: 'Let\'s eat (before meal)', category: 'daily', difficulty: 2 },
  { id: 'v12', japanese: 'ごちそうさまでした', reading: 'gochisousama deshita', english: 'Thank you for the meal', category: 'daily', difficulty: 3 },
  { id: 'v13', japanese: 'いってきます', reading: 'itte kimasu', english: 'I\'m leaving (home)', category: 'daily', difficulty: 2 },
  { id: 'v14', japanese: 'いってらっしゃい', reading: 'itte rasshai', english: 'Have a good day', category: 'daily', difficulty: 3 },
  { id: 'v15', japanese: 'ただいま', reading: 'tadaima', english: 'I\'m home', category: 'daily', difficulty: 1 },
  { id: 'v16', japanese: 'おかえりなさい', reading: 'okaeri nasai', english: 'Welcome home', category: 'daily', difficulty: 2 },
  
  // Questions
  { id: 'v17', japanese: 'これは何ですか', reading: 'kore wa nan desu ka', english: 'What is this?', category: 'questions', difficulty: 2 },
  { id: 'v18', japanese: 'どこですか', reading: 'doko desu ka', english: 'Where is it?', category: 'questions', difficulty: 1 },
  { id: 'v19', japanese: 'いくらですか', reading: 'ikura desu ka', english: 'How much is it?', category: 'questions', difficulty: 1 },
  { id: 'v20', japanese: '何時ですか', reading: 'nanji desu ka', english: 'What time is it?', category: 'questions', difficulty: 2 },
  
  // Expressions
  { id: 'v21', japanese: '大丈夫です', reading: 'daijoubu desu', english: 'It\'s okay / I\'m fine', category: 'expressions', difficulty: 2 },
  { id: 'v22', japanese: 'わかりました', reading: 'wakarimashita', english: 'I understand', category: 'expressions', difficulty: 2 },
  { id: 'v23', japanese: '知りません', reading: 'shirimasen', english: 'I don\'t know', category: 'expressions', difficulty: 2 },
  { id: 'v24', japanese: 'お願いします', reading: 'onegaishimasu', english: 'Please', category: 'expressions', difficulty: 2 },
  { id: 'v25', japanese: 'がんばります', reading: 'ganbarimasu', english: 'I\'ll do my best', category: 'expressions', difficulty: 3 },
];

// Achievement definitions
export const achievements = [
  { id: 'a1', title: 'First Steps', description: 'Complete your first lesson', icon: '🌟', xp: 50 },
  { id: 'a2', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥', xp: 200 },
  { id: 'a3', title: 'Conversation Starter', description: 'Complete 10 chat sessions', icon: '💬', xp: 150 },
  { id: 'a4', title: 'Voice Master', description: 'Practice 50 voice phrases', icon: '🎤', xp: 200 },
  { id: 'a5', title: 'Card Collector', description: 'Master 100 flashcards', icon: '🎴', xp: 300 },
  { id: 'a6', title: 'Quiz Champion', description: 'Answer 100 quiz questions correctly', icon: '🏆', xp: 250 },
  { id: 'a7', title: 'N5 Master', description: 'Complete all N5 vocabulary', icon: '📖', xp: 500 },
  { id: 'a8', title: 'Dedicated Learner', description: 'Reach 1000 XP', icon: '⭐', xp: 100 },
];

// Level thresholds
export const levelThresholds = [
  { level: 1, xpRequired: 0, title: 'Beginner' },
  { level: 2, xpRequired: 100, title: 'Novice' },
  { level: 3, xpRequired: 250, title: 'Apprentice' },
  { level: 4, xpRequired: 500, title: 'Intermediate' },
  { level: 5, xpRequired: 800, title: 'Advanced' },
  { level: 6, xpRequired: 1200, title: 'Expert' },
  { level: 7, xpRequired: 1800, title: 'Master' },
  { level: 8, xpRequired: 2500, title: 'Champion' },
  { level: 9, xpRequired: 3500, title: 'Legend' },
  { level: 10, xpRequired: 5000, title: 'Grandmaster' },
];

// Daily challenges
export const dailyChallenges = [
  { id: 'd1', title: 'Practice 5 flashcards', xp: 20, type: 'flashcard' },
  { id: 'd2', title: 'Complete 1 conversation', xp: 30, type: 'chat' },
  { id: 'd3', title: 'Practice 3 voice phrases', xp: 25, type: 'voice' },
  { id: 'd4', title: 'Answer 10 quiz questions', xp: 35, type: 'quiz' },
  { id: 'd5', title: 'Study for 15 minutes', xp: 40, type: 'time' },
];
