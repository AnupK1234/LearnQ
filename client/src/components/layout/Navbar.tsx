
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { 
  Book, 
  MessageSquare, 
  FileUp, 
  FlaskConical, 
  GraduationCap,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { title: 'Dashboard', icon: <Book size={18} />, path: '/dashboard' },
    { title: 'AI Chatbot', icon: <MessageSquare size={18} />, path: '/chat' },
    { title: 'Upload', icon: <FileUp size={18} />, path: '/upload' },
    { title: 'Flashcards', icon: <FlaskConical size={18} />, path: '/flashcards' },
    { title: 'AI Mentor', icon: <GraduationCap size={18} />, path: '/mentor' },
  ];

  return (
    <nav className="bg-white dark:bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-study-primary to-study-secondary flex items-center justify-center">
              <GraduationCap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-study-primary to-study-secondary">
              LearnQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Button 
                key={item.title}
                variant="ghost" 
                className="flex items-center space-x-1"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.title}</span>
              </Button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {menuItems.map((item) => (
              <Button 
                key={item.title}
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
