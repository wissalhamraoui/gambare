import { NextRequest, NextResponse } from 'next/server';

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation';
  question: string;
  questionReading?: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, count = 5, difficulty = 'mixed' } = body;

    // Generate quiz questions based on category
    const questions: QuizQuestion[] = [];
    
    // Vocabulary pools for different categories
    const vocabPools: Record<string, { word: string; reading: string; english: string }[]> = {
      greetings: [
        { word: 'こんにちは', reading: 'konnichiwa', english: 'Hello' },
        { word: 'おはようございます', reading: 'ohayou gozaimasu', english: 'Good morning' },
        { word: 'こんばんは', reading: 'konbanwa', english: 'Good evening' },
        { word: 'さようなら', reading: 'sayounara', english: 'Goodbye' },
        { word: 'ありがとうございます', reading: 'arigatou gozaimasu', english: 'Thank you very much' },
        { word: 'すみません', reading: 'sumimasen', english: 'Excuse me / I\'m sorry' },
        { word: 'はじめまして', reading: 'hajimemashite', english: 'Nice to meet you' },
        { word: 'お元気ですか', reading: 'ogenki desu ka', english: 'How are you?' },
        { word: 'おやすみなさい', reading: 'oyasuminasai', english: 'Good night' },
        { word: 'いってらっしゃい', reading: 'itterasshai', english: 'Have a good day' },
      ],
      numbers: [
        { word: '一', reading: 'ichi', english: 'One' },
        { word: '二', reading: 'ni', english: 'Two' },
        { word: '三', reading: 'san', english: 'Three' },
        { word: '四', reading: 'yon/shi', english: 'Four' },
        { word: '五', reading: 'go', english: 'Five' },
        { word: '六', reading: 'roku', english: 'Six' },
        { word: '七', reading: 'nana/shichi', english: 'Seven' },
        { word: '八', reading: 'hachi', english: 'Eight' },
        { word: '九', reading: 'kyuu/ku', english: 'Nine' },
        { word: '十', reading: 'juu', english: 'Ten' },
        { word: '百', reading: 'hyaku', english: 'Hundred' },
        { word: '千', reading: 'sen', english: 'Thousand' },
      ],
      verbs: [
        { word: '食べる', reading: 'taberu', english: 'To eat' },
        { word: '飲む', reading: 'nomu', english: 'To drink' },
        { word: '行く', reading: 'iku', english: 'To go' },
        { word: '来る', reading: 'kuru', english: 'To come' },
        { word: '見る', reading: 'miru', english: 'To see/watch' },
        { word: '聞く', reading: 'kiku', english: 'To listen/ask' },
        { word: '話す', reading: 'hanasu', english: 'To speak' },
        { word: '読む', reading: 'yomu', english: 'To read' },
        { word: '書く', reading: 'kaku', english: 'To write' },
        { word: '買う', reading: 'kau', english: 'To buy' },
        { word: '寝る', reading: 'neru', english: 'To sleep' },
        { word: '起きる', reading: 'okiru', english: 'To wake up' },
      ],
      adjectives: [
        { word: '大きい', reading: 'ookii', english: 'Big' },
        { word: '小さい', reading: 'chiisai', english: 'Small' },
        { word: '新しい', reading: 'atarashii', english: 'New' },
        { word: '古い', reading: 'furui', english: 'Old' },
        { word: '暑い', reading: 'atsui', english: 'Hot (weather)' },
        { word: '寒い', reading: 'samui', english: 'Cold (weather)' },
        { word: '高い', reading: 'takai', english: 'High/Expensive' },
        { word: '安い', reading: 'yasui', english: 'Cheap' },
        { word: '楽しい', reading: 'tanoshii', english: 'Fun' },
        { word: '難しい', reading: 'muzukashii', english: 'Difficult' },
      ],
      nouns: [
        { word: '水', reading: 'mizu', english: 'Water' },
        { word: 'お茶', reading: 'ocha', english: 'Tea' },
        { word: '学校', reading: 'gakkou', english: 'School' },
        { word: '家', reading: 'ie', english: 'House/Home' },
        { word: '友達', reading: 'tomodachi', english: 'Friend' },
        { word: '先生', reading: 'sensei', english: 'Teacher' },
        { word: '学生', reading: 'gakusei', english: 'Student' },
        { word: '電車', reading: 'densha', english: 'Train' },
        { word: '駅', reading: 'eki', english: 'Station' },
        { word: '本', reading: 'hon', english: 'Book' },
      ],
      time: [
        { word: '今日', reading: 'kyou', english: 'Today' },
        { word: '明日', reading: 'ashita', english: 'Tomorrow' },
        { word: '昨日', reading: 'kinou', english: 'Yesterday' },
        { word: '今', reading: 'ima', english: 'Now' },
        { word: '朝', reading: 'asa', english: 'Morning' },
        { word: '昼', reading: 'hiru', english: 'Noon/Daytime' },
        { word: '夜', reading: 'yoru', english: 'Night' },
        { word: '毎日', reading: 'mainichi', english: 'Every day' },
      ],
      expressions: [
        { word: '大丈夫', reading: 'daijoubu', english: 'It\'s okay / I\'m fine' },
        { word: 'ください', reading: 'kudasai', english: 'Please (give me)' },
        { word: 'わかりました', reading: 'wakarimashita', english: 'I understand' },
        { word: '知りません', reading: 'shirimasen', english: 'I don\'t know' },
        { word: 'お願いします', reading: 'onegaishimasu', english: 'Please (request)' },
        { word: 'すごい', reading: 'sugoi', english: 'Amazing / Wow' },
        { word: 'がんばります', reading: 'ganbarimasu', english: 'I\'ll do my best' },
      ],
    };

    // Select vocabulary pool based on category
    const pool = vocabPools[category] || vocabPools.greetings;
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
    
    // Generate questions
    for (let i = 0; i < Math.min(count, shuffledPool.length); i++) {
      const vocab = shuffledPool[i];
      const questionType = ['multiple-choice', 'fill-blank', 'translation'][Math.floor(Math.random() * 3)] as 'multiple-choice' | 'fill-blank' | 'translation';
      
      if (questionType === 'multiple-choice') {
        // Generate wrong options
        const wrongOptions = pool
          .filter(v => v.word !== vocab.word)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => v.english);
        
        const options = [...wrongOptions, vocab.english].sort(() => Math.random() - 0.5);
        
        questions.push({
          id: `gen-${Date.now()}-${i}`,
          type: 'multiple-choice',
          question: `What does "${vocab.word}" mean?`,
          questionReading: vocab.reading,
          options,
          correctAnswer: vocab.english,
          explanation: `${vocab.word} (${vocab.reading}) means "${vocab.english}"`,
          category: category || 'Vocabulary',
          difficulty: difficulty === 'mixed' ? (['easy', 'medium', 'hard'] as const)[Math.floor(Math.random() * 3)] : difficulty,
        });
      } else if (questionType === 'fill-blank') {
        questions.push({
          id: `gen-${Date.now()}-${i}`,
          type: 'fill-blank',
          question: `_____ means "${vocab.english}"`,
          questionReading: `_____ wa "${vocab.english}" desu.`,
          correctAnswer: vocab.word,
          explanation: `${vocab.word} (${vocab.reading}) means "${vocab.english}"`,
          category: category || 'Vocabulary',
          difficulty: difficulty === 'mixed' ? 'medium' : difficulty,
        });
      } else {
        questions.push({
          id: `gen-${Date.now()}-${i}`,
          type: 'translation',
          question: `Translate: "${vocab.word}" (${vocab.reading})`,
          correctAnswer: vocab.english,
          category: category || 'Vocabulary',
          difficulty: difficulty === 'mixed' ? (['easy', 'medium', 'hard'] as const)[Math.floor(Math.random() * 3)] : difficulty,
        });
      }
    }

    return NextResponse.json({
      success: true,
      questions,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
