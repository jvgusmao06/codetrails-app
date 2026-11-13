# Como Criar e Aprovar Trilhas no CodeTrilhas

O **CodeTrilhas** utiliza um fluxo **Git-driven** para criação e curadoria de trilhas de programação. Qualquer pessoa da comunidade pode propor uma nova trilha (linguagem, biblioteca ou framework) ou adicionar módulos/lições via **Pull Request**.

## 1. Estrutura de Diretórios

Todas as trilhas ficam em `content/tracks/<id-da-trilha>/`:

```text
content/tracks/
└── minha-trilha/
    ├── track.json
    └── mod-01-introducao/
        ├── lesson-01-conceitos.json
        └── lesson-02-pratica.json
```

## 2. Formato do `track.json`

```json
{
  "id": "minha-trilha",
  "title": "Nome da Trilha",
  "description": "Resumo curto sobre o que será ensinado.",
  "category": "language",
  "color": "#58CC02",
  "icon": "🚀",
  "author": "Seu Nome / GitHub",
  "modules": [
    {
      "id": "mod-01-introducao",
      "title": "Unidade 1: Fundamentos",
      "description": "Descrição da unidade.",
      "lessons": ["lesson-01-conceitos"]
    }
  ]
}
```
- `category` aceita: `"language"`, `"framework"`, `"library"` ou `"tool"`.

## 3. Tipos de Exercícios Suportados

1. **`multiple_choice`**: Pergunta de múltipla escolha com `options` e `correctIndex`.
2. **`fill_in_blank`**: Código com lacunas marcadas por `{{blank}}`, lista de `blanks` na ordem exata e `options` (banco de palavras amigável para o celular).

## 4. Validação Local antes do Pull Request

Execute o validador de schema para garantir que todas as lições seguem o padrão:

```bash
npm run validate:tracks
```
