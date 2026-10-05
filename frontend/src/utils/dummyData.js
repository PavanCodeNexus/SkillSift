export const CATEGORIES = [
  { id: "all", label: "🔥 All Trending" },
  { id: "languages", label: "💻 Programming Languages" },
  { id: "dsa", label: "🧩 DSA & Algorithms" },
  { id: "ai", label: "🤖 AI & Machine Learning" },
  { id: "web", label: "🌐 Full-Stack & Web" },
  { id: "cloud", label: "☁️ Cloud & DevOps" }
];

export const HOME_COURSES = [
  // Programming Languages
  {
    id: "lang-1",
    videoId: "rfscVS0vtbw",
    title: "Python Full Course for Beginners [2026 Tutorial]",
    channelTitle: "freeCodeCamp.org",
    views: 49200000,
    durationSeconds: 16012,
    thumbnailUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=640&q=80",
    category: "languages",
    level: "Beginner",
    language: "English",
    aiReason: "Comprehensive 4-hour foundations with clear OOP breakdown and zero assumed prior knowledge."
  },
  {
    id: "lang-2",
    videoId: "eIrMbAQSU34",
    title: "Java Full Course for Beginners [2026 Complete Roadmap]",
    channelTitle: "Programming with Mosh",
    views: 14200000,
    durationSeconds: 9100,
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=640&q=80",
    category: "languages",
    level: "Beginner",
    language: "English",
    aiReason: "Essential core Java for university coursework, object-oriented principles, and memory model."
  },
  {
    id: "lang-3",
    videoId: "vLnPwxZdW4Y",
    title: "C++ Tutorial for Beginners - Full Course (from Basics to STL)",
    channelTitle: "freeCodeCamp.org",
    views: 11500000,
    durationSeconds: 14700,
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&q=80",
    category: "languages",
    level: "Beginner",
    language: "English",
    aiReason: "Solid memory pointers and Standard Template Library (STL) required for competitive programming."
  },
  {
    id: "lang-4",
    videoId: "W6NZfCO5SIk",
    title: "JavaScript Tutorial for Beginners: Complete Modern JS Course",
    channelTitle: "Programming with Mosh",
    views: 18000000,
    durationSeconds: 3600,
    thumbnailUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=640&q=80",
    category: "languages",
    level: "Beginner",
    language: "English",
    aiReason: "Modern ES6+ syntax, asynchronous JS, and DOM manipulation for college web projects."
  },

  // DSA & Algorithms
  {
    id: "dsa-1",
    videoId: "RBSGKlAvoiM",
    title: "Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer",
    channelTitle: "freeCodeCamp.org",
    views: 7490000,
    durationSeconds: 28997,
    thumbnailUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=640&q=80",
    category: "dsa",
    level: "Intermediate",
    language: "English",
    aiReason: "Deep visual breakdown of binary trees, union find, dynamic programming, and graph algorithms."
  },
  {
    id: "dsa-2",
    videoId: "8hly31xKli0",
    title: "Data Structures & Algorithms in Java - Full Interview Course",
    channelTitle: "NeetCode",
    views: 1850000,
    durationSeconds: 28800,
    thumbnailUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=640&q=80",
    category: "dsa",
    level: "Intermediate",
    language: "English",
    aiReason: "Top pick for college placement prep; visual array & tree traversals with LeetCode patterns."
  },
  {
    id: "dsa-3",
    videoId: "CBYHwZcbD-s",
    title: "Data Structures and Algorithms Full Course 📈",
    channelTitle: "Bro Code",
    views: 3070000,
    durationSeconds: 14415,
    thumbnailUrl: "https://images.unsplash.com/photo-1516116211227-bbc13c744ef5?w=640&q=80",
    category: "dsa",
    level: "Beginner",
    language: "English",
    aiReason: "Step-by-step big-O time complexity analysis with concise animations."
  },

  // AI & Machine Learning
  {
    id: "ai-1",
    videoId: "i_LwzRVP7bg",
    title: "Machine Learning for Everybody – Full Course",
    channelTitle: "freeCodeCamp.org",
    views: 3200000,
    durationSeconds: 14100,
    thumbnailUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=640&q=80",
    category: "ai",
    level: "Beginner",
    language: "English",
    aiReason: "Hands-on supervised & unsupervised models using Python, scikit-learn, and real datasets."
  },
  {
    id: "ai-2",
    videoId: "aircAruvnKk",
    title: "Neural Networks from Scratch - Deep Learning Full Course",
    channelTitle: "3Blue1Brown",
    views: 12500000,
    durationSeconds: 7200,
    thumbnailUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=640&q=80",
    category: "ai",
    level: "Intermediate",
    language: "English",
    aiReason: "Award-winning geometric visual intuition behind backpropagation and gradient descent."
  },
  {
    id: "ai-3",
    videoId: "kCc8FmEb1nY",
    title: "Build Generative AI & Large Language Model Apps with LangChain",
    channelTitle: "freeCodeCamp.org",
    views: 1450000,
    durationSeconds: 18000,
    thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=640&q=80",
    category: "ai",
    level: "Advanced",
    language: "English",
    aiReason: "Industry standard RAG pipelines, vector embeddings, and autonomous agent frameworks."
  },

  // Full-Stack & Web
  {
    id: "web-1",
    videoId: "SqcY0GlETPk",
    title: "Full Stack Web Development with React & Node.js",
    channelTitle: "Traversy Media",
    views: 2400000,
    durationSeconds: 19800,
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=640&q=80",
    category: "web",
    level: "Beginner",
    language: "English",
    aiReason: "Hands-on project-centric build; perfect for building final year engineering capstones."
  },
  {
    id: "web-2",
    videoId: "ulprqHHWlng",
    title: "Spring Boot 3 & Microservices Architecture Deep Dive",
    channelTitle: "Amigoscode",
    views: 1250000,
    durationSeconds: 21600,
    thumbnailUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=640&q=80",
    category: "web",
    level: "Advanced",
    language: "English",
    aiReason: "Industry standard backend patterns: Docker, JWT security, and production-ready REST design."
  },

  // Cloud & DevOps
  {
    id: "cloud-1",
    videoId: "kUMe1FH4CHE",
    title: "AWS Cloud Practitioner Certified Masterclass",
    channelTitle: "Stephane Maarek",
    views: 1100000,
    durationSeconds: 14400,
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&q=80",
    category: "cloud",
    level: "Beginner",
    language: "English",
    aiReason: "Succinct slides and console demos directly mapped to cloud certification domains."
  },
  {
    id: "cloud-2",
    videoId: "3c-iBn73dDE",
    title: "Docker & Kubernetes Full Course for College Engineers",
    channelTitle: "TechWorld with Nana",
    views: 3900000,
    durationSeconds: 12600,
    thumbnailUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=640&q=80",
    category: "cloud",
    level: "Intermediate",
    language: "English",
    aiReason: "Containerization fundamentals, CI/CD pipelines, and microservices orchestration."
  }
];
