---
title: Universal Chroma Key Shader
excerpt: Shader de efecto Chroma Key para Unity 3D
layout: post
type: project
permalink: /project/universal-chroma-key-shader/
image: assets/images/2014/03/keyshader-150x150.png
category: [Computer Vision]
tags: [unity]
---

**A simple shader to achieve the chroma key compositing effect on any texture, including movie textures.**

<a class="btn btn-success" href="/assets/store/universal_chroma_key_shader/WebPlayer.html" title="Universal Chroma Shader Example">View Example</a>
<a class="btn btn-primary" href="https://www.assetstore.unity3d.com/#/content/15172" title="Unity3D Asset Store">Open in Asset Store >></a>

![Chroma Key Shader in Action](http://www.rodripf.com/wp-content/uploads/2014/03/keyshader.png)

It makes the selected color of your texture (image, video or webcam capture) transparent, so you can easily remove the background. You can place any other content behind or in front, also using the shader, so you can get your desired composition.

### Ideas for uses:  

  * Removing the background of a video to simulate another background
  * Get textures with transparency using JPG files instead of bigger PNGs with alpha
  * Create a 3D parallax effect

### Features:

  * You can select the color to be removed (most often used is green, but any color can be assigned). -You can control the color tolerance to remove similar colors
  * You can control the strength of the cutoff 
  * You can change these values on runtime
  * You can use the shader multiple times in the same scene

### Included in the package:

  * The shader
  * Sample scene

### Tested platforms:

  * Windows and Mac Standalone
  * Android (not movie texture!)
  * WebPlayer
  * It should work in all platforms.

### To change programatically on runtime the behavior of the shader, you can do it on this way:

```csharp 
renderer.material.SetFloat("_Sens", 0.2f);
renderer.material.SetFloat("_Cutoff", 0.4f);
renderer.material.SetColor("_Color", new Color(0f, 1f, 0f));
```

![Reviews](/assets/images/2014/03/review.jpg)

<a class="btn btn-success" href="/assets/store/universal_chroma_key_shader/WebPlayer.html" title="Universal Chroma Shader Example">View Example</a>
<a class="btn btn-primary" href="https://www.assetstore.unity3d.com/#/content/15172" title="Unity3D Asset Store">Open in Asset Store >></a>