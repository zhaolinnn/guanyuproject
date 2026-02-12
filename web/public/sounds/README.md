# Audio files for the app

Put your MP3 files here (or in subfolders) and reference them in the app by path.

## How to connect MP3 files

1. **Add files**  
   Place your `.mp3` files in this folder. You can use subfolders, e.g.:
   - `sounds/pinyin/nihao.mp3`
   - `sounds/pinyin/a.mp3`
   - `sounds/words/hello.mp3`

2. **Reference in code**  
   In your assignment page (or wherever you use `AudioTable`), use the **public path**:
   - Path in the filesystem: `web/public/sounds/pinyin/nihao.mp3`
   - URL in the app: **`/sounds/pinyin/nihao.mp3`**  
   Vite serves everything in `public/` from the site root, so no `public` in the URL.

3. **Example data for AudioTable**  
   ```js
   const rows = [
     [
       { label: '你好', src: '/sounds/pinyin/nihao.mp3' },
       { label: 'a', src: '/sounds/pinyin/a.mp3' },
     ],
     [
       { label: 'b', src: '/sounds/pinyin/b.mp3' },
       { label: 'c', src: '/sounds/pinyin/c.mp3' },
     ],
   ]
   ```

4. **Empty or placeholder cells**  
   Use `src: ''` for cells without audio; the button will be disabled.

5. **Full Pinyin chart (36×22)**  
   The Introduction to Pinyin page uses a chart where each cell maps to:
   - Path: `/sounds/pinyin/{initial}-{final}.mp3`
   - Empty initial (vowel-only syllable) uses `0`: e.g. `0-a.mp3` for "a".
   - Examples: `b-a.mp3` (ba), `zh-ang.mp3` (zhang), `0-er.mp3` (er).  
   Add MP3s for the valid Mandarin syllables you want; invalid cells will 404 until you add files.
