import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal,
    FileText,
    MessageSquare,
    X,
    Cpu,
    Wifi,
    Battery,
    Maximize2,
    Minimize2,
    Save,
    Clock
} from 'lucide-react';
import { fetchPosts, createPost, fetchArticles, createArticle, Post, Article } from './api/client';

/**
 * CUSTOM CSS FOR CRT/RETRO EFFECTS (LIGHT MODE)
 * ---------------------------------------------
 */
const retroStyles = `
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

:root {
  --terminal-ink: #1a1a1a;       /* Main text color (near black) */
  --terminal-dim: #9ca3af;       /* Dimmed text/borders (gray) */
  --terminal-bg: #fafafa;        /* Main background (paper white) */
  --terminal-surface: #ffffff;   /* Surface/Input background (pure white) */
  --crt-scanline: rgba(0, 0, 0, 0.04); /* Subtle dark scanline */
}

body {
  background-color: #f0f0f0;
  margin: 0;
  overflow: hidden; /* App handles scrolling */
}

.font-vt323 {
  font-family: 'VT323', monospace;
}

/* CRT Screen Effects */
.crt-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: var(--terminal-bg);
  overflow: hidden;
  color: var(--terminal-ink);
}

.crt-overlay {
  background: linear-gradient(
    rgba(255, 255, 255, 0) 50%, 
    rgba(0, 0, 0, 0.02) 50%
  ), linear-gradient(
    90deg, 
    rgba(0, 0, 0, 0.01), 
    rgba(255, 255, 255, 0.02), 
    rgba(0, 0, 0, 0.01)
  );
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  mix-blend-mode: multiply;
}

.crt-flicker {
  animation: flicker 0.15s infinite;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.02);
  z-index: 49;
}

@keyframes flicker {
  0% { opacity: 0.98; }
  50% { opacity: 1.0; }
  100% { opacity: 0.98; }
}

.border-retro {
  border: 2px solid var(--terminal-dim);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 12px;
  background: #e5e5e5;
}
::-webkit-scrollbar-thumb {
  background: var(--terminal-dim);
  border: 2px solid #e5e5e5;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--terminal-ink);
}

.blink {
  animation: blink-animation 1s steps(2, start) infinite;
}
@keyframes blink-animation {
  to { visibility: hidden; }
}

.scanline-bar {
  width: 100%;
  height: 5px;
  background: rgba(0, 0, 0, 0.05);
  position: absolute;
  z-index: 51;
  animation: scanline 8s linear infinite;
  pointer-events: none;
}
@keyframes scanline {
  0% { top: -10%; }
  100% { top: 110%; }
}

@keyframes load { 
  0% { width: 0%; } 
  100% { width: 100%; } 
}
`;

/**
 * UTILITY COMPONENTS
 * ------------------
 */

interface TypewriterProps {
    text: string;
    speed?: number;
    onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 30, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(timer);
                if (onComplete) onComplete();
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed, onComplete]);

    return <span>{displayedText}</span>;
};

interface GlitchTextProps {
    text: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text }) => {
    return (
        <span className="relative inline-block group font-bold tracking-widest">
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -ml-0.5 translate-x-[1px] text-gray-400 opacity-70 mix-blend-multiply animate-pulse hidden group-hover:block">
                {text}
            </span>
        </span>
    );
};

/**
 * MAIN APP COMPONENT
 * ------------------
 */
export default function RetroBlogApp() {
    const [activeTab, setActiveTab] = useState<'posts' | 'articles'>('posts');
    const [showBootSequence, setShowBootSequence] = useState(true);

    // Boot Sequence Effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBootSequence(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (showBootSequence) {
        return (
            <div className="h-screen w-full bg-[#fafafa] text-[#1a1a1a] font-vt323 text-xl p-8 overflow-hidden relative flex items-center justify-center">
                <style>{retroStyles}</style>
                <div className="crt-overlay"></div>
                <div className="max-w-2xl w-full mx-auto space-y-4 text-center">
                    <div className="text-4xl font-bold mb-8">OS_LOADER v2.0</div>

                    <div className="w-full bg-gray-200 h-6 border-2 border-[#1a1a1a] relative overflow-hidden p-1">
                        <div className="h-full bg-[#1a1a1a] w-full origin-left" style={{ animation: 'load 2.5s ease-out forwards' }}></div>
                    </div>

                    <div className="text-left font-mono text-lg mt-8 space-y-1 pl-4 border-l-2 border-[#1a1a1a]">
                        <p>CHECKING MEMORY... <span className="float-right">OK</span></p>
                        <p className="delay-75 animate-pulse">LOADING DRIVERS... <span className="float-right">OK</span></p>
                        <p className="delay-150">MOUNTING DISK... <span className="float-right">OK</span></p>
                        <p className="mt-4 text-gray-600">
                            <Typewriter text="INITIALIZING USER INTERFACE..." speed={20} />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="crt-container font-vt323 text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-white">
            <style>{retroStyles}</style>
            <div className="crt-overlay"></div>
            <div className="crt-flicker"></div>
            <div className="scanline-bar"></div>

            {/* Main Layout Grid */}
            <div className="relative z-10 h-full flex flex-col max-w-7xl mx-auto p-2 md:p-6">

                {/* Header */}
                <header className="flex-none border-b-2 border-[#1a1a1a] pb-4 mb-4 bg-[#fafafa] z-20">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase text-[#1a1a1a]">
                            <GlitchText text="DAILY_LOG" />
                        </h1>
                        <div className="text-right hidden md:block text-gray-500 text-sm">
                            <div><Clock size={14} className="inline mr-1" /> {new Date().toLocaleTimeString()}</div>
                            <div>SESSION_ID: {Math.floor(Math.random() * 9999)}</div>
                        </div>
                    </div>
                    <p className="text-sm md:text-xl text-gray-600 flex items-center gap-2">
                        <Terminal size={16} />
                        <span>USER: mohan</span>
                        <span className="mx-2">|</span>
                        <span className="text-green-600 font-bold">● ONLINE</span>
                    </p>
                </header>

                {/* Navigation Bar (Tab Style) */}
                <nav className="flex-none flex flex-wrap gap-4 mb-4 text-xl z-20">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`px-6 py-2 border-2 transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] 
            ${activeTab === 'posts'
                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                : 'bg-white text-[#1a1a1a] border-[#1a1a1a]'}`}
                    >
                        <MessageSquare size={18} />
                        /MICRO_LOGS
                    </button>

                    <button
                        onClick={() => setActiveTab('articles')}
                        className={`px-6 py-2 border-2 transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-[2px] hover:translate-y-[2px]
            ${activeTab === 'articles'
                                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                : 'bg-white text-[#1a1a1a] border-[#1a1a1a]'}`}
                    >
                        <FileText size={18} />
                        /ARTICLES
                    </button>

                    <div className="flex-grow"></div>

                    <div className="flex items-center gap-3 text-gray-400">
                        <Wifi size={18} />
                        <Cpu size={18} />
                        <Battery size={18} />
                    </div>
                </nav>

                {/* Main Content Area */}
                <main className="flex-grow overflow-hidden border-2 border-[#1a1a1a] bg-white relative flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">

                    {/* Top Bar of Window */}
                    <div className="flex-none h-8 bg-[#1a1a1a] flex items-center justify-between px-3 text-white font-bold select-none">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full inline-block"></span>
                            {activeTab === 'posts' ? 'FEED_READER.EXE' : 'DOCUMENT_VIEWER.APP'}
                        </span>
                        <div className="flex gap-2">
                            <Minimize2 size={14} />
                            <Maximize2 size={14} />
                            <X size={14} className="cursor-pointer hover:text-red-400" />
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-grow overflow-y-auto p-4 md:p-8 custom-scrollbar bg-[#ffffff]">
                        {activeTab === 'posts' ? (
                            <MicroPostSection />
                        ) : (
                            <ArticleSection />
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="flex-none mt-2 text-gray-400 text-sm flex justify-between uppercase">
                    <span>Mem: 640K OK</span>
                    <span>SYSTEM: READY</span>
                </footer>
            </div>
        </div>
    );
}

/**
 * MICRO-POSTS SECTION (Twitter/Feed style)
 * ----------------------------------------
 */
function MicroPostSection() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Fetch Posts on mount
    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await fetchPosts();
            setPosts(data);
        } catch (err) {
            console.error("Transmission failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPost.trim()) return;
        setIsSending(true);
        try {
            const savedPost = await createPost(newPost);
            setPosts([savedPost, ...posts]);
            setNewPost('');
        } catch (err) {
            console.error("Transmission failed", err);
        } finally {
            setIsSending(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-400">LOADING DATA...</div>;
    }

    return (
        <div className="flex flex-col h-full gap-6">
            {/* Input Area */}
            <div className="border-b-2 border-dashed border-gray-300 pb-8">
                <form onSubmit={handlePost} className="flex flex-col gap-2">
                    <label className="text-[#1a1a1a] text-lg mb-1 flex items-center gap-2 font-bold">
                        <span className="bg-[#1a1a1a] text-white px-1">{'>'}</span> NEW_ENTRY:
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="What is happening?"
                            className="flex-grow bg-gray-50 border-2 border-[#1a1a1a] text-[#1a1a1a] p-3 font-vt323 text-xl focus:outline-none focus:bg-white placeholder-gray-400 shadow-inner"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={isSending}
                            className="bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] px-6 py-2 hover:bg-white hover:text-[#1a1a1a] font-bold uppercase transition-colors disabled:opacity-50"
                        >
                            {isSending ? '...' : 'SEND'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Feed Area */}
            <div className="flex-grow space-y-4">
                {posts.length === 0 ? (
                    <div className="text-gray-400 italic text-center mt-10 border-2 border-dashed border-gray-200 p-8">
                        NO_DATA_FOUND
                    </div>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="bg-white border-2 border-gray-200 hover:border-[#1a1a1a] p-4 transition-all group shadow-sm hover:shadow-md">
                            <div className="flex justify-between items-start mb-2 text-sm text-gray-500 font-mono border-b border-gray-100 pb-2">
                                <span className="text-[#1a1a1a] font-bold">@{post.userName || 'ANON'}</span>
                                <span>{new Date(post.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-xl md:text-2xl leading-relaxed whitespace-pre-wrap text-[#1a1a1a]">{post.content}</p>
                        </div>
                    ))
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}

/**
 * ARTICLE SECTION (Long form content)
 * -----------------------------------
 */
function ArticleSection() {
    const [view, setView] = useState<'list' | 'read' | 'write'>('list');
    const [articles, setArticles] = useState<Article[]>([]);
    const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [loading, setLoading] = useState(true);

    // Fetch Articles on mount
    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            const data = await fetchArticles();
            setArticles(data);
        } catch (err) {
            console.error("Article Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title || !formData.content) return;
        try {
            const savedArticle = await createArticle(formData.title, formData.content);
            setArticles([savedArticle, ...articles]);
            setFormData({ title: '', content: '' });
            setView('list');
        } catch (err) {
            console.error("Save failed", err);
        }
    };

    const openArticle = (article: Article) => {
        setCurrentArticle(article);
        setView('read');
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-400">LOADING DATA...</div>;
    }

    // 1. LIST VIEW
    if (view === 'list') {
        return (
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6 border-b-2 border-[#1a1a1a] pb-4">
                    <h2 className="text-2xl text-[#1a1a1a] font-bold flex items-center gap-2">
                        <span className="bg-[#1a1a1a] text-white px-2">DIR</span>
                        ./ARTICLES
                    </h2>
                    <button
                        onClick={() => setView('write')}
                        className="border-2 border-[#1a1a1a] text-[#1a1a1a] px-4 py-1 hover:bg-[#1a1a1a] hover:text-white uppercase text-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                        + CREATE_FILE
                    </button>
                </div>

                <div className="grid gap-3 grid-cols-1">
                    {articles.map((article) => (
                        <div
                            key={article._id}
                            onClick={() => openArticle(article)}
                            className="border-2 border-gray-200 p-4 cursor-pointer hover:border-[#1a1a1a] hover:bg-gray-50 transition-colors group flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1 group-hover:underline">
                                    {article.title}
                                </h3>
                                <div className="text-sm text-gray-500 font-mono">
                                    SIZE: {article.wordCount || 0} WORDS
                                </div>
                            </div>
                            <span className="text-sm border border-gray-300 px-2 py-0.5 text-gray-500 bg-white">
                                .TXT
                            </span>
                        </div>
                    ))}
                    {articles.length === 0 && (
                        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-300">
                            [ EMPTY DIRECTORY ]
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 2. READ VIEW
    if (view === 'read' && currentArticle) {
        return (
            <div className="h-full flex flex-col animate-in fade-in duration-300">
                <div className="flex-none mb-4 border-b-2 border-gray-200 pb-2 flex justify-between items-center">
                    <button onClick={() => setView('list')} className="hover:underline flex items-center text-[#1a1a1a] font-bold">
                        {'< BACK_TO_ROOT'}
                    </button>
                    <div className="text-sm bg-gray-200 px-2 text-gray-600">READ_ONLY</div>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#1a1a1a] border-b-4 border-[#1a1a1a] pb-2">{currentArticle.title}</h1>
                        <div className="flex gap-4 text-sm mb-12 text-gray-500 font-mono">
                            <span>AUTHOR: {currentArticle.author || 'ROOT'}</span>
                            <span>DATE: {new Date(currentArticle.timestamp).toDateString()}</span>
                        </div>

                        <div className="prose prose-p:text-[#1a1a1a] prose-headings:text-[#1a1a1a] max-w-none font-vt323 text-xl md:text-2xl leading-loose whitespace-pre-wrap text-justify">
                            {currentArticle.content}
                        </div>

                        <div className="mt-16 text-center text-gray-400 border-t border-gray-200 pt-8">*** EOF ***</div>
                    </div>
                </div>
            </div>
        );
    }

    // 3. WRITE VIEW
    if (view === 'write') {
        return (
            <div className="h-full flex flex-col">
                <div className="flex-none mb-4 border-b-2 border-gray-200 pb-2 flex justify-between items-center">
                    <button onClick={() => setView('list')} className="hover:underline flex items-center text-gray-500 hover:text-red-600">
                        {'< CANCEL'}
                    </button>
                    <div className="text-sm text-red-600 font-bold animate-pulse">● REC</div>
                </div>

                <div className="flex-grow flex flex-col gap-6 max-w-4xl mx-auto w-full">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#1a1a1a] font-bold text-sm bg-gray-100 w-fit px-2">FILENAME / TITLE</label>
                        <input
                            className="bg-white border-2 border-[#1a1a1a] p-3 text-[#1a1a1a] text-3xl font-vt323 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-shadow"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Untitled_Document"
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-grow">
                        <label className="text-[#1a1a1a] font-bold text-sm bg-gray-100 w-fit px-2">BODY CONTENT</label>
                        <textarea
                            className="flex-grow bg-white border-2 border-gray-300 p-6 text-[#1a1a1a] text-xl font-vt323 focus:outline-none focus:border-[#1a1a1a] resize-none leading-relaxed shadow-inner"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Begin typing here..."
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-[#1a1a1a] text-white font-bold py-3 text-xl hover:bg-white hover:text-[#1a1a1a] border-2 border-[#1a1a1a] flex justify-center items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        <Save size={20} />
                        SAVE_TO_DISK
                    </button>
                </div>
            </div>
        );
    }

    return null;
}
