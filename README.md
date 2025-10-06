# Kodari Test - AI Code Generator

Test sitesi iÃ§in Netlify + Supabase + n8n kombinasyonu

## ğŸš€ Kurulum

### 1. Dependencies YÃ¼kle
```bash
npm install
```

### 2. Supabase Setup

Supabase dashboard'da ÅŸu tabloyu oluÅŸtur:

```sql
-- Projects tablosu
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  code TEXT,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index ekle
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

### 3. Environment Variables

`.env.local` dosyasÄ±nÄ± dÃ¼zenle:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/kodari
```

### 4. n8n Workflow Kur

`n8n-workflow.json` dosyasÄ±nÄ± n8n instance'Ä±na import et.

### 5. Netlify Deploy

```bash
npm run build
```

Netlify dashboard'da:
- Build command: `npm run build`
- Publish directory: `.next`
- Environment variables ekle

## ğŸ“¦ Ã–zellikler

- âœ… AI Code Generation
- âœ… Monaco Editor
- âœ… Supabase Database
- âœ… n8n Integration
- âœ… Modern UI
- âœ… Responsive Design

## ğŸ”§ Tech Stack

- **Frontend:** Next.js 14 + React 18
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Automation:** n8n
- **Deployment:** Netlify
- **Editor:** Monaco Editor

## ğŸ“ KullanÄ±m

1. Project name gir
2. Plugin aÃ§Ä±klamasÄ±nÄ± yaz
3. "Generate Code" butonuna tÄ±kla
4. n8n workflow AI'a istek gÃ¶nderir
5. OluÅŸturulan kod editÃ¶rde gÃ¶rÃ¼nÃ¼r
6. Supabase'e otomatik kaydedilir

## ğŸ¯ n8n Workflow

Workflow ÅŸunlarÄ± yapar:
1. Webhook ile isteÄŸi alÄ±r
2. OpenAI/Claude API'sine gÃ¶nderir
3. Kodu generate eder
4. Response dÃ¶ner
5. Frontend kodunu gÃ¶sterir ve DB'ye kaydeder

## ğŸ“ Support

Sorular iÃ§in: [Discord](https://discord.gg/kodari)
