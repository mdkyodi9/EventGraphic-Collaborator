/**
 * Main design editor with drag-and-drop functionality and collaboration features
 */
import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'
import { Badge } from '../components/ui/badge'
import { useProjectStore } from '../stores/useProjectStore'
import { useAuthStore } from '../stores/useAuthStore'
import { 
  Save, 
  Download, 
  Share2, 
  Users, 
  Type, 
  Image, 
  Square, 
  Circle,
  Upload,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  MessageCircle,
  Settings
} from 'lucide-react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

/**
 * Design editor component with tools and canvas
 */
export default function Editor() {
  const { user } = useAuthStore()
  const { currentProject, comments } = useProjectStore()
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showComments, setShowComments] = useState(false)

  // Mock canvas elements for demonstration
  const [canvasElements, setCanvasElements] = useState([
    {
      id: 'text_1',
      type: 'text',
      x: 100,
      y: 100,
      width: 300,
      height: 50,
      data: { text: 'Your Event Title', fontSize: 32, fontWeight: 'bold', color: '#1f2937' }
    },
    {
      id: 'text_2',
      type: 'text',
      x: 100,
      y: 200,
      width: 400,
      height: 30,
      data: { text: 'Join us for an amazing experience', fontSize: 18, color: '#6b7280' }
    }
  ])

  const exportFormats = [
    { label: 'Instagram Square (1080x1080)', value: 'instagram-square' },
    { label: 'Instagram Story (1080x1920)', value: 'instagram-story' },
    { label: 'Facebook Post (1200x630)', value: 'facebook-post' },
    { label: 'Twitter Post (1200x675)', value: 'twitter-post' },
    { label: 'LinkedIn Post (1200x627)', value: 'linkedin-post' },
    { label: 'Custom Size', value: 'custom' }
  ]

  const handleAddText = () => {
    const newElement = {
      id: `text_${Date.now()}`,
      type: 'text',
      x: 150,
      y: 150,
      width: 200,
      height: 40,
      data: { text: 'New Text', fontSize: 24, color: '#1f2937' }
    }
    setCanvasElements([...canvasElements, newElement])
  }

  const handleAddImage = () => {
    const newElement = {
      id: `image_${Date.now()}`,
      type: 'image',
      x: 200,
      y: 300,
      width: 200,
      height: 150,
      data: { src: 'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/e4b66d06-7e16-4a5d-9208-7a75a6e2824b.jpg', alt: 'Image' }
    }
    setCanvasElements([...canvasElements, newElement])
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Editor Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Input 
              defaultValue="Untitled Design" 
              className="text-lg font-semibold border-0 p-0 h-auto focus-visible:ring-0"
            />
            <Badge variant="outline">Draft</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setZoomLevel(Math.max(25, zoomLevel - 25))}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm min-w-[60px] text-center">{zoomLevel}%</span>
              <Button variant="ghost" size="sm" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
              <MessageCircle className="h-4 w-4" />
              <span className="ml-1">{comments.length}</span>
            </Button>
            
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            
            <Select>
              <SelectTrigger className="w-48">
                <Download className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Download" />
              </SelectTrigger>
              <SelectContent>
                {exportFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <Tabs defaultValue="elements" className="w-full">
            <TabsList className="grid w-full grid-cols-4 m-2">
              <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
              <TabsTrigger value="text" className="text-xs">Text</TabsTrigger>
              <TabsTrigger value="images" className="text-xs">Images</TabsTrigger>
              <TabsTrigger value="brand" className="text-xs">Brand</TabsTrigger>
            </TabsList>
            
            <TabsContent value="elements" className="m-0 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Basic Elements</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-20 flex-col" onClick={handleAddText}>
                      <Type className="h-6 w-6 mb-1" />
                      <span className="text-xs">Text</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col" onClick={handleAddImage}>
                      <Image className="h-6 w-6 mb-1" />
                      <span className="text-xs">Image</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Square className="h-6 w-6 mb-1" />
                      <span className="text-xs">Rectangle</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Circle className="h-6 w-6 mb-1" />
                      <span className="text-xs">Circle</span>
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Palette className="h-4 w-4 mr-2" />
                      Brand Colors
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="m-0 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Text Styles</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full h-12 text-left font-bold text-xl">
                      Heading
                    </Button>
                    <Button variant="outline" className="w-full h-10 text-left font-semibold">
                      Subheading
                    </Button>
                    <Button variant="outline" className="w-full h-8 text-left">
                      Body Text
                    </Button>
                  </div>
                </div>
                
                {selectedElement && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold mb-3">Formatting</h3>
                      <div className="space-y-3">
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Underline className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlignRight className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Font Size</label>
                          <Input type="number" defaultValue="24" className="mt-1" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Color</label>
                          <div className="flex space-x-2 mt-2">
                            <div className="w-8 h-8 bg-black rounded cursor-pointer"></div>
                            <div className="w-8 h-8 bg-blue-600 rounded cursor-pointer"></div>
                            <div className="w-8 h-8 bg-red-500 rounded cursor-pointer"></div>
                            <div className="w-8 h-8 bg-green-500 rounded cursor-pointer"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="m-0 p-4">
              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload from Device
                </Button>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-3">Stock Photos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/328afbb4-4d69-42a1-98df-388ca8ab1253.jpg',
                      'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/e0dccb67-2947-4a38-9f00-ffd6ef4194cd.jpg',
                      'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/04f0d318-f9e9-4025-8db9-10b69afe253b.jpg',
                      'https://pub-cdn.sider.ai/u/U0W8H7AJXEV/web-coder/688fc0850cd2d7c5a265891b/resource/71d1c7e4-532d-4d37-bafc-82b9d862ad10.jpg'
                    ].map((src, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80">
                        <img src={src} alt={`Stock ${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="brand" className="m-0 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Brand Logo</h3>
                  <Button variant="outline" className="w-full h-20 border-dashed">
                    <Upload className="h-6 w-6 mb-1" />
                    <span className="text-xs">Upload Logo</span>
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Brand Colors</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="aspect-square bg-blue-600 rounded cursor-pointer"></div>
                    <div className="aspect-square bg-purple-600 rounded cursor-pointer"></div>
                    <div className="aspect-square bg-green-600 rounded cursor-pointer"></div>
                    <div className="aspect-square bg-orange-600 rounded cursor-pointer"></div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Brand Fonts</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full text-left font-sans">Inter</Button>
                    <Button variant="outline" className="w-full text-left font-serif">Playfair Display</Button>
                    <Button variant="outline" className="w-full text-left font-mono">Roboto Mono</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col bg-gray-100">
          <div className="flex-1 flex items-center justify-center p-8">
            <div 
              className="bg-white shadow-2xl relative"
              style={{ 
                width: '800px', 
                height: '800px',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'center'
              }}
            >
              {/* Canvas Elements */}
              {canvasElements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move ${selectedElement === element.id ? 'ring-2 ring-blue-500' : ''}`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.type === 'text' && (
                    <div
                      className="w-full h-full flex items-center"
                      style={{
                        fontSize: element.data.fontSize,
                        fontWeight: element.data.fontWeight,
                        color: element.data.color
                      }}
                    >
                      {element.data.text}
                    </div>
                  )}
                  {element.type === 'image' && (
                    <img
                      src={element.data.src}
                      alt={element.data.alt}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                  
                  {/* Selection handles */}
                  {selectedElement === element.id && (
                    <>
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Comments (when enabled) */}
        {showComments && (
          <div className="w-80 bg-white border-l">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Comments</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowComments(false)}>
                  ×
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No comments yet</p>
                  <p className="text-sm text-gray-400">Click anywhere on the canvas to add a comment</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600">
                            {comment.userName[0]}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{comment.userName}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
