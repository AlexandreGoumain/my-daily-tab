import type { Category } from '../types';

export const defaultCategories: Category[] = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: '💻',
    isCustom: false,
    enabled: true,
    feeds: [
      { id: 'devto', name: 'Dev.to', url: 'https://dev.to/feed', enabled: true },
      { id: 'css-tricks', name: 'CSS-Tricks', url: 'https://css-tricks.com/feed/', enabled: true },
      { id: 'smashing', name: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/', enabled: true },
      { id: 'webdev', name: 'web.dev', url: 'https://web.dev/feed.xml', enabled: true },
    ],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: '🤖',
    isCustom: false,
    enabled: true,
    feeds: [
      { id: 'openai', name: 'OpenAI Blog', url: 'https://openai.com/blog/rss/', enabled: true },
      { id: 'huggingface', name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', enabled: true },
      { id: 'mit-ai', name: 'MIT AI News', url: 'https://news.mit.edu/topic/artificial-intelligence2/feed', enabled: true },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: '☁️',
    isCustom: false,
    enabled: true,
    feeds: [
      { id: 'kubernetes', name: 'Kubernetes Blog', url: 'https://kubernetes.io/feed.xml', enabled: true },
      { id: 'digitalocean', name: 'DigitalOcean', url: 'https://www.digitalocean.com/blog/feed', enabled: true },
      { id: 'hashicorp', name: 'HashiCorp', url: 'https://www.hashicorp.com/blog/feed.xml', enabled: true },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    icon: '📱',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'android-devs', name: 'Android Developers', url: 'https://android-developers.googleblog.com/feeds/posts/default', enabled: true },
      { id: 'swift', name: 'Swift Blog', url: 'https://www.swift.org/atom.xml', enabled: true },
    ],
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    icon: '🔐',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'krebs', name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/', enabled: true },
      { id: 'hackernews-sec', name: 'The Hacker News', url: 'https://feeds.feedburner.com/TheHackersNews', enabled: true },
    ],
  },
  {
    id: 'gamedev',
    name: 'Game Development',
    icon: '🎮',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'gamedeveloper', name: 'Game Developer', url: 'https://www.gamedeveloper.com/rss.xml', enabled: true },
      { id: 'unity', name: 'Unity Blog', url: 'https://blog.unity.com/feed', enabled: true },
    ],
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'rust-blog', name: 'Rust Blog', url: 'https://blog.rust-lang.org/feed.xml', enabled: true },
      { id: 'this-week-rust', name: 'This Week in Rust', url: 'https://this-week-in-rust.org/rss.xml', enabled: true },
    ],
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'real-python', name: 'Real Python', url: 'https://realpython.com/atom.xml', enabled: true },
      { id: 'planet-python', name: 'Planet Python', url: 'https://planetpython.org/rss20.xml', enabled: true },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    isCustom: false,
    enabled: true,
    feeds: [
      { id: 'js-weekly', name: 'JavaScript Weekly', url: 'https://javascriptweekly.com/rss/', enabled: true },
      { id: 'react-blog', name: 'React Blog', url: 'https://react.dev/rss.xml', enabled: true },
    ],
  },
  {
    id: 'golang',
    name: 'Go',
    icon: '🐹',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'go-blog', name: 'Go Blog', url: 'https://go.dev/blog/feed.atom', enabled: true },
    ],
  },
  {
    id: 'tech-news',
    name: 'Tech News',
    icon: '📰',
    isCustom: false,
    enabled: true,
    feeds: [
      { id: 'techcrunch', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', enabled: true },
      { id: 'verge', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', enabled: true },
      { id: 'ars', name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index', enabled: true },
    ],
  },
  {
    id: 'tech-fr',
    name: 'Tech FR',
    icon: '🇫🇷',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'korben', name: 'Korben', url: 'https://korben.info/feed', enabled: true },
      { id: 'nextinpact', name: 'Next INpact', url: 'https://www.nextinpact.com/rss/news.xml', enabled: true },
      { id: 'numerama', name: 'Numerama', url: 'https://www.numerama.com/feed/', enabled: true },
    ],
  },
  {
    id: 'startups',
    name: 'Startups',
    icon: '🚀',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'indie-hackers', name: 'Indie Hackers', url: 'https://www.indiehackers.com/feed.xml', enabled: true },
      { id: 'producthunt', name: 'Product Hunt', url: 'https://www.producthunt.com/feed', enabled: true },
    ],
  },
  {
    id: 'design',
    name: 'Design & UX',
    icon: '🎨',
    isCustom: false,
    enabled: false,
    feeds: [
      { id: 'ux-collective', name: 'UX Collective', url: 'https://uxdesign.cc/feed', enabled: true },
      { id: 'smashing-ux', name: 'Smashing UX', url: 'https://www.smashingmagazine.com/categories/ux-design/index.xml', enabled: true },
    ],
  },
];
