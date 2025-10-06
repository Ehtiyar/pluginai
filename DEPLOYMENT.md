# ğŸš€ KODARI TEST - DEPLOYMENT GUIDE

## AdÄ±m 1: Supabase Setup

1. **Supabase Projesi OluÅŸtur**
   - https://supabase.com adresine git
   - "New Project" butonuna tÄ±kla
   - Proje adÄ±: `kodari-test`
   - Database password belirle
   - Region seÃ§ (en yakÄ±n)
   - "Create Project" tÄ±kla

2. **Database Schema Kur**
   - Supabase Dashboard â†’ SQL Editor
   - `supabase-schema.sql` dosyasÄ±nÄ±n iÃ§eriÄŸini kopyala
   - SQL Editor'a yapÄ±ÅŸtÄ±r
   - "RUN" butonuna tÄ±kla
   - âœ… Tablolar ve RLS policies oluÅŸturuldu

3. **API Keys Al**
   - Settings â†’ API
   - `Project URL` kopyala â†’ `.env.local`'e ekle
   - `anon public` key kopyala â†’ `.env.local`'e ekle

## AdÄ±m 2: n8n Setup

1. **n8n Instance HazÄ±rla**
   - Cloud: https://n8n.io (Ã¶nerilen)
   - Self-hosted: Docker ile kur

2. **Workflow Import Et**
   - n8n Dashboard â†’ "Import Workflow"
   - `n8n-workflow.json` dosyasÄ±nÄ± seÃ§
   - Import et

3. **Credentials Ekle**
   - **OpenAI API:**
     - Credentials â†’ Add Credential â†’ OpenAI
     - API Key ekle (https://platform.openai.com/api-keys)
   
   - **Supabase PostgreSQL:**
     - Credentials â†’ Add Credential â†’ Postgres
     - Host: `db.XXXXXXXX.supabase.co`
     - Database: `postgres`
     - User: `postgres`
     - Password: Supabase DB password
     - Port: `5432`
     - SSL: `require`

4. **Webhook URL Al**
   - Workflow'u aÃ§
   - "Webhook - Kodari" node'una tÄ±kla
   - Production URL kopyala
   - `.env.local`'e ekle

5. **Workflow Aktif Et**
   - SaÄŸ Ã¼st kÃ¶ÅŸede "Active" toggle'Ä± aÃ§
   - âœ… Workflow hazÄ±r

## AdÄ±m 3: Frontend Setup

1. **Environment Variables Ayarla**
   ```bash
   cd kodari-test
   # .env.local dosyasÄ±nÄ± dÃ¼zenle:
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.app/webhook/kodari
   ```

2. **Dependencies YÃ¼kle**
   ```bash
   npm install
   ```

3. **Local Test**
   ```bash
   npm run dev
   ```
   - http://localhost:3000 aÃ§
   - Test et

## AdÄ±m 4: Netlify Deployment

### YÃ¶ntem 1: Git ile Deploy (Ã–nerilen)

1. **Git Repository OluÅŸtur**
   ```bash
   cd kodari-test
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **GitHub'a Push**
   - GitHub'da yeni repo oluÅŸtur: `kodari-test`
   ```bash
   git remote add origin https://github.com/YOURUSERNAME/kodari-test.git
   git branch -M main
   git push -u origin main
   ```

3. **Netlify'da Deploy**
   - https://app.netlify.com â†’ "Add new site"
   - "Import from Git" seÃ§
   - GitHub repository'yi seÃ§
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Environment variables ekle:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_N8N_WEBHOOK_URL`
   - "Deploy site" tÄ±kla

### YÃ¶ntem 2: Drag & Drop Deploy

1. **Build OluÅŸtur**
   ```bash
   npm run build
   ```

2. **Netlify Drop**
   - https://app.netlify.com/drop
   - `.next` klasÃ¶rÃ¼nÃ¼ sÃ¼rÃ¼kle
   - Environment variables ekle (Site settings â†’ Build & deploy â†’ Environment)

## AdÄ±m 5: Test Et

1. **Site AÃ§**
   - Netlify URL'ini aÃ§ (Ã¶rn: https://kodari-test.netlify.app)

2. **Test Senaryosu**
   - Project Name: "TestPlugin"
   - Prompt: "Create a simple teleport command that teleports player to spawn"
   - "Generate Code" tÄ±kla
   - AI kodu Ã¼retmeli
   - Kod editÃ¶rde gÃ¶rÃ¼nmeli
   - Supabase'de `projects` ve `ai_requests` tablolarÄ±nÄ± kontrol et

3. **Debug**
   - Browser Console'u aÃ§ (F12)
   - Network tab'Ä± kontrol et
   - n8n workflow executions'Ä± kontrol et
   - Supabase logs'u kontrol et

## ğŸ¯ Ã–nemli Notlar

### Supabase
- RLS (Row Level Security) aktif - test iÃ§in geÃ§ici kapatabilirsin
- Anonymous requests iÃ§in policy ekle veya service_role key kullan

### n8n
- Free tier: 5,000 executions/month
- Webhook URL'i public - production'da authentication ekle

### Netlify
- Free tier: 100GB bandwidth/month
- Build time: 300 minutes/month

### OpenAI
- API key'i gizli tut (n8n'de)
- Token limitlerine dikkat et
- gpt-4o-mini kullanarak maliyet dÃ¼ÅŸÃ¼k

## ğŸ”’ GÃ¼venlik Ä°yileÅŸtirmeleri

### Production iÃ§in:
1. **Rate Limiting** ekle
2. **Authentication** ekle (Supabase Auth)
3. **API Key validation** ekle
4. **CORS** ayarlarÄ±nÄ± dÃ¼zenle
5. **Webhook authentication** ekle (n8n)

## ğŸ“Š Monitoring

### Supabase Dashboard:
- Database â†’ Tables â†’ Data kontrol
- Logs â†’ Real-time logs

### n8n Dashboard:
- Executions â†’ BaÅŸarÄ±lÄ±/baÅŸarÄ±sÄ±z istekleri gÃ¶r
- Error logs kontrol

### Netlify Dashboard:
- Deploys â†’ Build logs
- Functions â†’ Execution logs
- Analytics â†’ Trafik

## ğŸ†˜ Sorun Giderme

### "Failed to fetch" hatasÄ±:
- CORS ayarlarÄ±nÄ± kontrol et
- n8n webhook URL'i doÄŸru mu?
- n8n workflow aktif mi?

### "Supabase connection failed":
- API keys doÄŸru mu?
- RLS policies doÄŸru mu?
- Network kurallarÄ± aÃ§Ä±k mÄ±?

### "OpenAI API error":
- API key geÃ§erli mi?
- Kredi var mÄ±?
- Rate limit aÅŸÄ±lmadÄ± mÄ±?

## âœ… Checklist

- [ ] Supabase projesi oluÅŸturuldu
- [ ] Database schema Ã§alÄ±ÅŸtÄ±rÄ±ldÄ±
- [ ] Supabase API keys alÄ±ndÄ±
- [ ] n8n instance hazÄ±r
- [ ] n8n workflow import edildi
- [ ] OpenAI API credential eklendi
- [ ] Supabase PostgreSQL credential eklendi
- [ ] n8n workflow aktif
- [ ] .env.local dosyasÄ± dÃ¼zenlendi
- [ ] npm install Ã§alÄ±ÅŸtÄ±rÄ±ldÄ±
- [ ] Local test baÅŸarÄ±lÄ±
- [ ] Git repository oluÅŸturuldu
- [ ] GitHub'a push edildi
- [ ] Netlify'da deploy edildi
- [ ] Environment variables eklendi
- [ ] Production test baÅŸarÄ±lÄ±

## ğŸš€ BaÅŸarÄ±lÄ± Deploy!

Site hazÄ±r: https://your-site.netlify.app

Test et ve geliÅŸtirmeye devam et! ğŸ‰
