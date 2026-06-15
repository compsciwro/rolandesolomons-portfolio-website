# assets/ — images go here

Drop your images in this folder, then point the HTML at them with
`src="assets/filename.jpg"`.

## Suggested file names (match the comments in index.html)

| File to add here        | Used for                          |
|-------------------------|-----------------------------------|
| `me.jpg`                | Your photo in the hero collage card |
| `project-portfolio.jpg` | Portfolio mission screenshot      |
| `project-solar.jpg`     | Solar System AR screenshot        |
| `project-bloomward.jpg` | Bloomward RL screenshot           |
| `project-mandela.jpg`   | Nelson Mandela AR screenshot      |
| `cv.pdf`                | Your resume (link it in Contact)  |

You can name files anything you like — just make the `src="assets/…"` in
`index.html` match.

## How to swap a placeholder for a real image

In `index.html`, find a placeholder like:

```html
<div class="mission-shot placeholder-shot">🖥️ screenshot</div>
```

and replace it with:

```html
<img src="assets/project-portfolio.jpg" alt="Portfolio screenshot" class="mission-shot" />
```

Keep the `class="..."` exactly the same — that's what keeps the size/border styling.

## Tips
- Use **.jpg** for photos/screenshots, **.png** if you need transparency.
- Keep images reasonably small (ideally under ~500 KB each) so the site loads fast.
- File names are case-sensitive on GitHub Pages: `Me.JPG` ≠ `me.jpg`.

## Uploading from GitHub (works on iPad)
Repo → **Add file ▾ → Upload files** → choose your images → set the path to
`assets/` if needed → **Commit changes**. The live site updates in ~1 minute.
