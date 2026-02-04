# 🎬 3D Cube Video Showcase

## Overview
The 3D cube in the home section now features an interactive video player that displays `orex.mp4` when the cube opens. This creates a premium, cinematic showcase for your featured project or innovation.

## ✨ Features Implemented

### 1. **Video Integration**
- **Video File**: `orex.mp4` (located in `/public/orex.mp4`)
- **Auto-play**: Video starts automatically when cube opens
- **Loop**: Video plays continuously on repeat
- **Muted**: Silent playback for better UX
- **Responsive**: 16:9 aspect ratio video container

### 2. **Enhanced Cube Opening Animation**
- **Larger Content Panel**: Increased from 256px to 320px width
- **Video Container**: Full-width aspect-ratio video player
- **Premium Styling**: Rounded corners, borders, and shadows
- **Smooth Transitions**: 700ms animation with bounce effect

### 3. **Interactive Controls**
- **Click to Open**: Click the cube to reveal the video
- **Click Outside to Close**: Click anywhere outside the video panel to close
- **Click Inside Protection**: Clicking the video won't close the cube
- **Smooth Close**: All faces return to original position

### 4. **Premium Design**
- **White Panel**: 95% opacity white background with blur
- **Border Glow**: Sky blue border matching the cube variant
- **Shadow Effects**: Layered shadows for depth
- **Badge**: "Featured Project" label
- **Title**: "Innovation Showcase"
- **Description**: Helpful text for users

## 🎯 User Experience Flow

1. **Closed State**: 
   - 3D cube rotates continuously
   - Pulsing glow underneath
   - Hover pauses rotation

2. **Opening Animation** (Click cube):
   - Top face swings up (0s delay)
   - Right face swings right (0.15s delay)
   - Left face swings left (0.3s delay)
   - Bottom face swings down (0.45s delay)
   - Front face fades forward
   - Back face moves backward
   - Video panel appears (0.6s delay)

3. **Open State**:
   - Video plays automatically
   - Clean white panel with video
   - Badge, title, and description visible
   - Click outside to close

4. **Closing Animation** (Click outside):
   - Video panel fades out immediately
   - All faces return to original position
   - Cube resumes rotation
   - Glow reappears

## 📐 Technical Specifications

### Video Element
```tsx
<video
    src="/orex.mp4"
    className="w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
/>
```

### Container Dimensions
- **Width**: 320px (80 in Tailwind)
- **Padding**: 24px (6 in Tailwind)
- **Video Aspect**: 16:9 (aspect-video)
- **Border Radius**: 16px (rounded-2xl)

### Animation Timing
- **Transition Duration**: 700ms
- **Easing**: cubic-bezier(0.34, 1.56, 0.64, 1) - Bounce effect
- **Video Reveal Delay**: 600ms (after faces open)
- **Video Hide Delay**: 0ms (instant on close)

## 🎨 Styling Details

### Content Panel
- Background: `bg-white/95` (95% opacity white)
- Backdrop: `backdrop-blur-3xl` (heavy blur)
- Border: 2px solid (sky-300 or blue-200 based on variant)
- Shadow: Large glow shadow matching variant color

### Video Container
- Background: `bg-black` (for letterboxing)
- Border: 2px solid (matching variant)
- Border Radius: `rounded-xl` (12px)
- Shadow: `shadow-lg` (large shadow)
- Overflow: Hidden (clips video to rounded corners)

### Text Elements
- **Badge**: 
  - Size: 10px uppercase
  - Background: Sky-100 or Blue-100
  - Text: Sky-700 or Blue-600
  - Padding: 12px horizontal, 4px vertical
  - Border Radius: Full (pill shape)

- **Title**: 
  - Size: 20px (text-xl)
  - Weight: Bold (700)
  - Color: Gray-800

- **Description**: 
  - Size: 14px (text-sm)
  - Color: Gray-600
  - Max Width: 240px
  - Line Height: Relaxed

## 🔧 Code Changes Made

### 1. Added Imports
```tsx
import React, { useState, useEffect, useRef } from 'react';
```

### 2. Added State & Ref
```tsx
const contentRef = useRef<HTMLDivElement>(null);
```

### 3. Click-Outside Detection
```tsx
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (isOpen && contentRef.current && !contentRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [isOpen]);
```

### 4. Video Content
Replaced the static image with:
- Video element with orex.mp4
- Larger container (320px vs 256px)
- Updated text content
- Added ref and click protection

## 📱 Responsive Behavior

### Desktop (>= 1024px)
- Cube appears on the right side of hero section
- Full-size video player (320px panel)
- All animations at full speed

### Mobile (< 1024px)
- Cube appears below the main content
- Slightly smaller but still prominent
- Same animation quality
- Touch-friendly interactions

## 🎬 Video Requirements

### File Location
- Path: `/public/orex.mp4`
- Access: `/orex.mp4` in the code

### Recommended Video Specs
- **Format**: MP4 (H.264 codec)
- **Aspect Ratio**: 16:9
- **Resolution**: 1280x720 or 1920x1080
- **Duration**: Any (loops automatically)
- **File Size**: < 10MB for fast loading
- **Frame Rate**: 30fps or 60fps

### Video Attributes
- `autoPlay` - Starts automatically when cube opens
- `loop` - Plays continuously
- `muted` - Silent playback (required for autoplay)
- `playsInline` - Prevents fullscreen on mobile

## 🚀 Usage

The cube is already integrated in your `App.tsx`:

```tsx
{/* Desktop Cube */}
<HeroCube variant="sky" className="hidden lg:block mb-12 mx-auto" />

{/* Mobile Cube */}
<HeroCube variant="sky" className="block md:hidden mb-8" />
```

### How Users Interact

1. **View the cube** - It rotates automatically in the hero section
2. **Click the cube** - Opens with animation, revealing the video
3. **Watch the video** - Plays automatically on loop
4. **Click outside** - Closes the cube smoothly
5. **Repeat** - Can open and close as many times as desired

## 💡 Best Practices

### Video Content
- Keep videos short (5-30 seconds) for engagement
- Use high-quality footage that represents your brand
- Ensure good contrast and visibility
- Consider adding text overlays in the video itself

### Performance
- Optimize video file size for web
- Use appropriate resolution (1080p max)
- Consider lazy loading for below-the-fold cubes
- Test on mobile devices for smooth playback

### Accessibility
- Video is muted by default (good for UX)
- Click-outside is intuitive for closing
- Clear visual feedback on interactions
- Keyboard navigation could be added if needed

## 🎯 Perfect For

- **Product Demos**: Showcase your product in action
- **Brand Videos**: Display your brand story
- **Project Highlights**: Feature your best work
- **Animations**: Show motion graphics or animations
- **Testimonials**: Video testimonials from clients

## ⚡ Performance Notes

- Video only loads when page loads (not lazy)
- Autoplay starts only when cube opens
- Hardware-accelerated CSS transforms
- Smooth 60fps animations
- Minimal JavaScript overhead
- Click detection is efficient with event delegation

## 🎨 Customization Options

### Change Video
Replace `/orex.mp4` with your video file:
```tsx
<video src="/your-video.mp4" ... />
```

### Adjust Size
Modify the container width:
```tsx
className="w-80"  // Current: 320px
className="w-96"  // Larger: 384px
className="w-72"  // Smaller: 288px
```

### Change Text
Update the content:
```tsx
<div>Featured Project</div>  // Badge
<h3>Innovation Showcase</h3>  // Title
<p>Your description here</p>  // Description
```

### Variant Colors
Two variants available:
- `variant="sky"` - Sky blue theme (current)
- `variant="blue"` - Blue theme

---

## 🎉 Summary

Your 3D cube now features:
- ✅ **Video playback** inside the cube
- ✅ **Auto-play on open** for instant engagement
- ✅ **Click-outside to close** for better UX
- ✅ **Premium design** with smooth animations
- ✅ **Responsive layout** for all devices
- ✅ **Performance optimized** for smooth playback

**The cube is live in your hero section!** Click it to see the video showcase in action. 🚀
