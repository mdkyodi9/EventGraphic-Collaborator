/**
 * Main navigation bar component with user authentication and navigation links
 */
import React from 'react'
import { Link, useLocation } from 'react-router'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuthStore } from '../../stores/useAuthStore'
import { Palette, User, LogOut, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

/**
 * Navigation bar component with responsive design and user menu
 */
export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const handleLogin = () => {
    // Mock login for demo
    useAuthStore.getState().login({
      id: 'user_1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin',
      avatar: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/90328dcf-63cf-49ea-ad35-54a98c98779e.png'
    })
  }

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventDesign
            </span>
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/dashboard') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/templates"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/templates') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Templates
              </Link>
              <Link
                to="/editor"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive('/editor') ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                Editor
              </Link>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={handleLogin}>
                  Sign In
                </Button>
                <Button onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
