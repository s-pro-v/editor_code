require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });

function hudEscapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = String(text ?? '');
    return d.innerHTML;
}

/** Toast wg Industrial HUD (`alert.css` + `#toast-container`). */
function showHudToast(label, message, variant) {
    const wrap = document.getElementById('toast-container');
    if (!wrap) return;
    const map = {
        default: '',
        info: 'toast-info',
        success: 'toast-success',
        critical: 'toast-critical',
        warning: 'toast-warning',
    };
    const extra = map[variant] || map.default;
    const toast = document.createElement('div');
    toast.className = 'toast' + (extra ? ' ' + extra : '');
    toast.setAttribute('role', 'status');
    toast.innerHTML =
        '<div class="toast-header"><span class="toast-label">' +
        hudEscapeHtml(label) +
        '</span><button type="button" class="toast-close" aria-label="Zamknij">&times;</button></div>' +
        '<div class="toast-message">' +
        hudEscapeHtml(message) +
        '</div>';
    const btn = toast.querySelector('.toast-close');
    const removeToast = () => {
        if (!toast.parentNode) return;
        toast.classList.add('closing');
        window.setTimeout(() => toast.remove(), 320);
    };
    if (btn) btn.addEventListener('click', removeToast);
    wrap.appendChild(toast);
    window.setTimeout(removeToast, 5200);
}

if (typeof window !== 'undefined') {
    window.showHudToast = showHudToast;
}

// Funkcja do definiowania motywow Monaco - wywolywana natychmiast gdy Monaco jest dostepne
function defineMonacoThemes() {
    // Sprawdzamy czy Monaco jest zaladowane
    if (typeof monaco === 'undefined' || !monaco.editor) {
        console.warn('Monaco Editor not available yet');
        return false;
    }

    try {
        // Definicja ciemnego motywu z pelnym mapowaniem palety CORE
        monaco.editor.defineTheme('terminal-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                // OGOLNE
                { token: 'comment', foreground: '4d595f', fontStyle: 'bold' },
                { token: 'keyword', foreground: 'b267e6', fontStyle: 'bold' },
                { token: 'string', foreground: '21fd6b' },
                { token: 'number', foreground: 'F39C12' },
                { token: 'identifier', foreground: '00ffd9', fontStyle: 'bold' },
                { token: 'type', foreground: 'f859b1' },
                { token: 'delimiter', foreground: 'aaa8a8ec' },
                { token: 'operator', foreground: '2493fa' },
                { token: 'regexp', foreground: '21fd6b' },

                // HTML
                { token: 'tag', foreground: '00B2FF', fontStyle: 'bold' },
                { token: 'tag.html', foreground: '00B2FF', fontStyle: 'bold' },
                { token: 'attribute.name', foreground: 'fed404', fontStyle: 'bold' },
                { token: 'attribute.name.html', foreground: 'fed404', fontStyle: 'bold' },
                { token: 'attribute.value', foreground: '37E7AC' },
                { token: 'attribute.value.html', foreground: '37E7AC' },
                { token: 'metatag', foreground: '1ab2f8' },
                { token: 'metatag.content.html', foreground: 'c5c5c5' },
                { token: 'entity.other.attribute-name.id.html', foreground: 'f64ab4' },
                { token: 'punctuation.definition.tag.html', foreground: '0587c4' },

                // CSS
                { token: 'tag.css', foreground: '00B2FF', fontStyle: 'bold' },
                { token: 'attribute.name.css', foreground: '37E7AC' },
                { token: 'attribute.value.css', foreground: 'FED604' },
                { token: 'string.css', foreground: 'FED604' },
                { token: 'number.css', foreground: 'FED604' },
                { token: 'keyword.css', foreground: 'ab54fd', fontStyle: 'bold' },
                { token: 'type.css', foreground: '37E7AC' },
                { token: 'comment.css', foreground: '4d595f', fontStyle: 'bold' },
                { token: 'variable.css', foreground: 'f15a4c' },
                { token: 'variable.predefined.css', foreground: 'f15a4c' },
                { token: 'entity.other.attribute-name.class.css', foreground: 'c34ef1', fontStyle: 'bold' },
                { token: 'entity.other.attribute-name.id.css', foreground: 'CC6699', fontStyle: 'bold' },
                { token: 'support.type.property-name.css', foreground: '37E7AC' },
                { token: 'constant.other.color.rgb-value.hex.css', foreground: 'FED604' },
                { token: 'constant.numeric.css', foreground: 'FED604' },
                { token: 'keyword.control.at-rule.media.css', foreground: 'ab54fd' },
                { token: 'support.function.misc.css', foreground: 'F39C12' },
                { token: 'support.function.calc.css', foreground: 'F39C12' },
                { token: 'support.function.gradient.css', foreground: 'F39C12' },
                { token: 'entity.other.attribute-name.pseudo-class.css', foreground: 'd63384' },

                // JAVASCRIPT
                { token: 'keyword.js', foreground: 'b267e6', fontStyle: 'bold' },
                { token: 'string.js', foreground: '21fd6b' },
                { token: 'number.js', foreground: 'F39C12' },
                { token: 'identifier.js', foreground: '00ffd9', fontStyle: 'bold' },
                { token: 'type.js', foreground: 'f859b1' },
                { token: 'comment.js', foreground: '4D595F', fontStyle: 'bold' },
                { token: 'comment.block.js', foreground: '4D595F', fontStyle: 'bold' },
                { token: 'comment.line.js', foreground: '4D595F', fontStyle: 'bold' },
                { token: 'variable.js', foreground: '00ffd9', fontStyle: 'bold' },
                { token: 'variable.predefined.js', foreground: '00ffd9', fontStyle: 'bold' },
                { token: 'variable.parameter.js', foreground: '00ffd9' },
                { token: 'function.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'function.call.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'entity.name.function.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'property.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'variable.other.property.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'operator.js', foreground: 'E2E2E2EC' },
                { token: 'regexp.js', foreground: '21fd6b' },
                { token: 'constant.js', foreground: '2493fa', fontStyle: 'bold' },
                { token: 'constant.numeric.js', foreground: 'F39C12' },
                { token: 'constant.language.js', foreground: '2493fa', fontStyle: 'bold' },
                { token: 'constant.language.boolean.true.js', foreground: '46fc55' },
                { token: 'constant.language.boolean.false.js', foreground: 'ee1f18' },
                { token: 'constant.language.null.js', foreground: '2493fa', fontStyle: 'bold' },
                { token: 'constant.language.undefined.js', foreground: '2493fa', fontStyle: 'bold' },
                { token: 'support.function.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'support.class.js', foreground: 'f859b1', fontStyle: 'bold' },
                { token: 'support.type.js', foreground: 'f859b1' },
                { token: 'support.variable.js', foreground: '00ffd9', fontStyle: 'bold' },
                { token: 'entity.name.class.js', foreground: 'f859b1' },
                { token: 'entity.name.type.js', foreground: 'f859b1' },
                { token: 'storage.type.js', foreground: 'b267e6', fontStyle: 'bold' },
                { token: 'storage.modifier.js', foreground: 'b267e6', fontStyle: 'bold' },
                { token: 'storage.modifier.async.js', foreground: '2493fa', fontStyle: 'bold' },
                { token: 'variable.language.this.js', foreground: 'f859b1', fontStyle: 'bold' },
                { token: 'meta.function-call.js', foreground: 'F39C12', fontStyle: 'bold' },
                { token: 'variable.other.object.js', foreground: 'F39C12', fontStyle: 'bold' },
                { token: 'string.template.js', foreground: '21fd6b', fontStyle: 'bold' },
                { token: 'punctuation.definition.string.js', foreground: '21fd6b' },
                { token: 'punctuation.definition.comment.js', foreground: '4D595F' },
                { token: 'meta.object-literal.key.js', foreground: 'f15a4c' },
                { token: 'variable.other.readwrite.alias.js', foreground: 'FED604', fontStyle: 'bold' },
                { token: 'support.type.object.module.js', foreground: 'F39C12' }
            ],
            colors: {
                'editor.background': '#1a1a1a',
                'editor.foreground': '#e2e2e2ec',
                'editorCursor.foreground': '#ff7300',
                'editor.lineHighlightBackground': '#2e2e2e52',
                'editorLineNumber.foreground': '#94949460',
                'editorLineNumber.activeForeground': '#fffffff8',
                'editor.selectionBackground': '#a0a0a033',
                'editor.selectionHighlightBackground': '#47474754',
                'editor.wordHighlightBackground': '#343F56',
                'editor.foldBackground': '#17181A',
                'editorWhitespace.foreground': '#3b3a32',
                'editorIndentGuide.background': '#97a7c826',
                'scrollbarSlider.background': '#252526',
                'scrollbarSlider.hoverBackground': '#2b2b2b',
                'scrollbarSlider.activeBackground': '#ffffff50',
                'editorWidget.background': '#17181a',
                'editorWidget.border': '#585858',
                'editorSuggestWidget.background': '#212224',
                'editorSuggestWidget.foreground': '#cecece',
                'editorSuggestWidget.highlightForeground': '#ff7300',
                'editorSuggestWidget.selectedBackground': '#1c423cc5',
                'editorSuggestWidget.border': '#585858',
                'editorHoverWidget.background': '#17181a',
                'editorHoverWidget.foreground': '#cecece',
                'list.activeSelectionBackground': '#e6e6e609',
                'list.activeSelectionForeground': '#ffffff',
                'list.focusBackground': '#1a1a17',
                'list.focusForeground': '#fff',
                'list.hoverBackground': '#1E1F21',
                'list.highlightForeground': '#ff7300',
                'input.background': '#202124',
                'input.foreground': '#f0f0f0',
                'input.border': '#dfdfdf23',
                'input.placeholderForeground': '#c0c0c06e',
                'dropdown.background': '#202124',
                'dropdown.foreground': '#eeeeee',
                'dropdown.border': '#ff7300',
                'peekView.border': '#ff7300',
                'peekViewEditor.background': '#17181a',
                'peekViewResult.background': '#17181a',
                'peekViewTitle.background': '#121315',
                'peekViewTitleLabel.foreground': '#ff7300',
                'button.background': '#ff7300',
                'button.foreground': '#f0f0f0',
                'button.hoverBackground': '#ff8c33',
                'button.border': '#ff7300',
                'findMatchBorder': '#ff7300',
                'editorGroupHeader.tabsBackground': '#121315',
                'editorGroupHeader.tabsBorder': '#dfdfdf44',
                'tab.activeBackground': '#292828b4',
                'tab.hoverBackground': '#292828b4',
                'tab.inactiveBackground': '#17181ac9',
                'tab.inactiveForeground': '#f0f0f0',
                'tab.unfocusedInactiveForeground': '#ff7300',
                'editorGutter.addedBackground': '#ff7300',
                'editorGutter.modifiedBackground': '#938464'
            }
        });

        // Definicja jasnego motywu z pelnym mapowaniem palety CORE
        monaco.editor.defineTheme('terminal-light', {
            base: 'vs',
            inherit: true,
            rules: [
                // Podstawowe tokeny
                { token: '', foreground: '1a1a1a', background: 'ffffff' },
                { token: 'comment', foreground: '8b8b8b', fontStyle: 'italic' },
                { token: 'comment.line', foreground: '8b8b8b', fontStyle: 'italic' },
                { token: 'comment.block', foreground: '8b8b8b', fontStyle: 'italic' },
                { token: 'comment.doc', foreground: '8b8b8b', fontStyle: 'italic' },

                // Slowa kluczowe
                { token: 'keyword', foreground: 'fd810d', fontStyle: 'bold' },
                { token: 'keyword.control', foreground: 'fd810d', fontStyle: 'bold' },
                { token: 'keyword.operator', foreground: 'fd810d' },
                { token: 'keyword.other', foreground: 'fd810d', fontStyle: 'bold' },

                // Stringi
                { token: 'string', foreground: '28a745' },
                { token: 'string.quoted', foreground: '28a745' },
                { token: 'string.template', foreground: '28a745' },
                { token: 'string.regexp', foreground: '28a745' },

                // Liczby
                { token: 'number', foreground: 'fd810d' },
                { token: 'number.hex', foreground: 'fd810d' },
                { token: 'number.binary', foreground: 'fd810d' },
                { token: 'number.octal', foreground: 'fd810d' },
                { token: 'number.float', foreground: 'fd810d' },

                // Typy i klasy
                { token: 'type', foreground: '1a1a1a' },
                { token: 'type.identifier', foreground: '1a1a1a' },
                { token: 'class', foreground: '1a1a1a', fontStyle: 'bold' },
                { token: 'class.name', foreground: '1a1a1a', fontStyle: 'bold' },

                // Identyfikatory
                { token: 'identifier', foreground: '1a1a1a' },
                { token: 'identifier.function', foreground: '1a1a1a' },
                { token: 'identifier.variable', foreground: '1a1a1a' },
                { token: 'identifier.constant', foreground: 'fd810d' },

                // Funkcje
                { token: 'function', foreground: '1a1a1a' },
                { token: 'function.name', foreground: '1a1a1a' },

                // Operatory i delimitery
                { token: 'delimiter', foreground: '1a1a1a' },
                { token: 'delimiter.bracket', foreground: '1a1a1a' },
                { token: 'delimiter.parenthesis', foreground: '1a1a1a' },
                { token: 'delimiter.square', foreground: '1a1a1a' },
                { token: 'operator', foreground: 'fd810d' },

                // Tagi (HTML/XML)
                { token: 'tag', foreground: 'fd810d' },
                { token: 'tag.name', foreground: 'fd810d' },
                { token: 'tag.attribute', foreground: '1a1a1a' },
                { token: 'tag.delimiter', foreground: '1a1a1a' },

                // Atrybuty
                { token: 'attribute.name', foreground: '1a1a1a' },
                { token: 'attribute.value', foreground: '28a745' },

                // CSS
                { token: 'property', foreground: '1a1a1a' },
                { token: 'property.name', foreground: '1a1a1a' },
                { token: 'property.value', foreground: '28a745' },
                { token: 'selector', foreground: 'fd810d' },
                { token: 'unit', foreground: 'fd810d' },

                // JSON
                { token: 'key', foreground: '1a1a1a' },
                { token: 'value', foreground: '28a745' },

                // Zmienne specjalne
                { token: 'variable', foreground: '1a1a1a' },
                { token: 'variable.predefined', foreground: 'fd810d' },
                { token: 'variable.parameter', foreground: '1a1a1a' },

                // Inne
                { token: 'constant', foreground: 'fd810d' },
                { token: 'constant.language', foreground: 'fd810d', fontStyle: 'bold' },
                { token: 'constant.numeric', foreground: 'fd810d' },
                { token: 'entity.name', foreground: '1a1a1a' },
                { token: 'support', foreground: '1a1a1a' },
                { token: 'support.function', foreground: '1a1a1a' },
                { token: 'support.class', foreground: '1a1a1a' },
                { token: 'meta', foreground: '1a1a1a' },
                { token: 'invalid', foreground: 'ff0000', fontStyle: 'bold' },
                { token: 'invalid.deprecated', foreground: 'ff0000', fontStyle: 'italic' }
            ],
            colors: {
                // Edytor glowny
                'editor.background': '#ffffff',
                'editor.foreground': '#1a1a1a',
                'editorCursor.foreground': '#fd810d',
                'editor.lineHighlightBackground': '#f5f5f5',
                'editorLineNumber.foreground': '#8b8b8b61',
                'editorLineNumber.activeForeground': '#8b8b8b',

                // Zaznaczenie i dopasowania
                'editor.selectionBackground': '#c5c5c544',
                'editor.inactiveSelectionBackground': '#e8e8e8',
                'editor.selectionHighlightBackground': '#fd810d22',
                'editor.wordHighlightBackground': '#00000000',
                'editor.findMatchBackground': '#fd810d22',

                // Widgety (Find, Suggest, Hover)
                'editorWidget.background': '#f5f5f5',
                'editorWidget.border': '#e0e0e0',
                'editorSuggestWidget.background': '#f5f5f5',
                'editorSuggestWidget.border': '#e0e0e0',
                'editorSuggestWidget.selectedBackground': '#e8e8e8',
                'editorSuggestWidget.foreground': '#1a1a1a',
                'editorSuggestWidget.highlightForeground': '#fd810d',
                'editorHoverWidget.background': '#f5f5f5',
                'editorHoverWidget.border': '#e0e0e0',
                'editorHoverWidget.foreground': '#1a1a1a',

                // Menu kontekstowe
                'menu.background': '#f5f5f5',
                'menu.foreground': '#1a1a1a',
                'menu.selectionBackground': '#e8e8e8',
                'menu.selectionForeground': '#fd810d',
                'menu.separatorBackground': '#e0e0e0',
                'menu.border': '#e0e0e0',

                // Input
                'input.background': '#ffffff',
                'input.border': '#e0e0e0',
                'input.foreground': '#1a1a1a',
                'inputOption.activeForeground': '#fd810d',

                // Lista i selekcja
                'list.activeSelectionBackground': '#e8e8e8',
                'list.activeSelectionForeground': '#fd810d',
                'list.dropBackground': '#e8e8e8',
                'list.hoverBackground': '#e8e8e8',
                'list.hoverForeground': '#fd810d',
                'list.focusBackground': '#e8e8e8',
                'list.focusForeground': '#fd810d',
                'list.inactiveSelectionBackground': '#e8e8e8',
                'list.inactiveSelectionForeground': '#1a1a1a',
                'quickInputList.focusBackground': '#e8e8e8',
                'quickInputList.focusForeground': '#fd810d',

                // Inne
                'editorBracketMatch.background': '#fd810d44',
                'editorBracketMatch.border': '#fd810d',
                'button.background': '#e8e8e8',
                'button.foreground': '#1a1a1a',
                'button.hoverBackground': '#fd810d',
                'badge.background': '#e8e8e8',
                'badge.foreground': '#1a1a1a',
                'focusBorder': '#fd810d',
                'editorGutter.background': '#ffffff',
                'editorGutter.foldingControlForeground': '#8b8b8b',
                'scrollbar.shadow': '#00000011',
                'scrollbarSlider.background': '#e0e0e0',
                'scrollbarSlider.hoverBackground': '#fd810d',
                'scrollbarSlider.activeBackground': '#fd810d'
            }
        });

        console.log('Monaco themes defined successfully');
        return true;
    } catch (e) {
        console.error('Error defining Monaco themes:', e);
        return false;
    }
}

// Eksportuj funkcje dla uzycia w innych miejscach
window.defineMonacoThemes = defineMonacoThemes;

/**
 * IntelliSense + diagnostyka (czerwone fale) + szybkie poprawki (zarowka) dla JS/TS w Monaco.
 * Wywolaj po zaladowaniu vs/editor/editor.main (globalne monaco).
 */
function configureMonacoLanguageService() {
    if (typeof monaco === 'undefined' || !monaco.languages || !monaco.languages.typescript) {
        console.warn('Monaco: brak monaco.languages.typescript — pelne podpowiedzi/diagnostyka moga byc ograniczone.');
        return;
    }

    const ts = monaco.languages.typescript;

    try {
        const target = ts.ScriptTarget && ts.ScriptTarget.ES2020 !== undefined
            ? ts.ScriptTarget.ES2020
            : (ts.ScriptTarget.Latest || ts.ScriptTarget.ESNext);

        const compilerOptions = {
            target,
            allowNonTsExtensions: true,
            allowJs: true,
            checkJs: true,
            module: ts.ModuleKind.ESNext,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            jsx: ts.JsxEmit.None,
            noEmit: true,
            esModuleInterop: true,
            resolveJsonModule: true,
            isolatedModules: true,
            skipLibCheck: true
        };

        ts.javascriptDefaults.setCompilerOptions({
            ...compilerOptions,
            /* Bez tego + semantyki TS pluje TS2339 przy DOM/style i dowolnym kodzie podgladu. */
            checkJs: false
        });
        ts.typescriptDefaults.setCompilerOptions(compilerOptions);

        /* JS (bufor „JS”): tylko skladnia — bez TS2339/2322 itd. (style, parent, biblioteki w stringach). */
        const diagnosticsOptionsJs = {
            noSemanticValidation: true,
            noSyntaxValidation: false,
            noSuggestionDiagnostics: false
        };
        const diagnosticsOptionsTs = {
            noSemanticValidation: false,
            noSyntaxValidation: false,
            noSuggestionDiagnostics: false
        };
        ts.javascriptDefaults.setDiagnosticsOptions(diagnosticsOptionsJs);
        ts.typescriptDefaults.setDiagnosticsOptions(diagnosticsOptionsTs);

        if (typeof ts.javascriptDefaults.setEagerModelSync === 'function') {
            ts.javascriptDefaults.setEagerModelSync(true);
        }
        if (typeof ts.typescriptDefaults.setEagerModelSync === 'function') {
            ts.typescriptDefaults.setEagerModelSync(true);
        }
    } catch (e) {
        console.warn('configureMonacoLanguageService:', e);
    }

    try {
        if (window._monacoExtraSnippetProviders) return;
        window._monacoExtraSnippetProviders = true;

        const kind = monaco.languages.CompletionItemKind;
        const insertRules = monaco.languages.CompletionItemInsertTextRule;

        const extraSnippets = [
            {
                label: 'log',
                kind: kind.Snippet,
                insertText: 'console.log(${1});',
                insertTextRules: insertRules.InsertAsSnippet,
                documentation: 'console.log(...)',
                detail: 'snippet (OXY)'
            },
            {
                label: 'clog',
                kind: kind.Snippet,
                insertText: 'console.log(\'${1}\', ${2});',
                insertTextRules: insertRules.InsertAsSnippet,
                documentation: 'console.log z etykieta',
                detail: 'snippet (OXY)'
            },
            {
                label: 'asyncfn',
                kind: kind.Snippet,
                insertText: 'async function ${1:name}(${2}) {\n\t${3}\n}',
                insertTextRules: insertRules.InsertAsSnippet,
                documentation: 'async function',
                detail: 'snippet (OXY)'
            },
            {
                label: 'try',
                kind: kind.Snippet,
                insertText: 'try {\n\t${1}\n} catch (${2:e}) {\n\t${3}\n}',
                insertTextRules: insertRules.InsertAsSnippet,
                documentation: 'try/catch',
                detail: 'snippet (OXY)'
            }
        ];

        const provide = (model, position) => {
            const word = model.getWordUntilPosition(position);
            const prefix = String(word.word || '').toLowerCase();
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            };

            const filtered = extraSnippets.filter((s) =>
                !prefix || String(s.label).toLowerCase().startsWith(prefix)
            );
            if (!filtered.length) {
                return { suggestions: [] };
            }

            return {
                suggestions: filtered.map((s) => ({ ...s, range }))
            };
        };

        ['javascript', 'typescript'].forEach((id) => {
            monaco.languages.registerCompletionItemProvider(id, {
                provideCompletionItems: provide
            });
        });
    } catch (e) {
        console.warn('registerCompletionItemProvider (snippety):', e);
    }
}

window.configureMonacoLanguageService = configureMonacoLanguageService;

// Probuj zdefiniowac motywy od razu (jesli Monaco jest juz zaladowane)
if (typeof monaco !== 'undefined' && monaco.editor) {
    defineMonacoThemes();
} else {
    // Jesli Monaco nie jest jeszcze zaladowane, czekaj na nie
    const checkMonaco = setInterval(() => {
        if (typeof monaco !== 'undefined' && monaco.editor) {
            clearInterval(checkMonaco);
            defineMonacoThemes();
        }
    }, 50);

    // Timeout po 5 sekundach
    setTimeout(() => {
        clearInterval(checkMonaco);
    }, 5000);
}

/**
 * Panel ustawien edytora Monaco (CSS VAR INJECTOR style)
 * Uzycie: loadSettings() na starcie, getEditorOptions() przy tworzeniu edytorow,
 * showSettings() do otwarcia panelu.
 */
const CODE_EDITOR_SETTINGS_KEY = 'codeEditorSettings';
const THEME_KEY = 'cyber-refactor-theme';
/** Legacy: pojedynczy bufor (migracja) */
const EDITOR_BUFFER_KEY = 'oxyMonacoEditorBuffer';
const SPLIT_HTML_KEY = 'oxyMonacoSplitHtml';
const SPLIT_CSS_KEY = 'oxyMonacoSplitCss';
const SPLIT_JS_KEY = 'oxyMonacoSplitJs';
/** Cyber-style: jeden JSON z html + css + js */
const AUTO_SAVED_PROJECT_KEY = 'autoSavedProject';
/** Stan paneli workspace: podglad / edytor / tryb bez telemetrii */
const WORKSPACE_LAYOUT_KEY = 'oxyMonacoWorkspaceLayout';

/** Trzy instancje Monaco (ustawiane w require po create) */
let editors = { html: null, css: null, js: null };

const defaultCyberProject = {
    html: `<!-- Cyber Structure -->
<div class="container">
    <div class="card">
        <div class="cyber-logo" aria-label="Cyber Code">
            <span class="cyber-logo__glyph" aria-hidden="true">&gt;_</span>
            <div class="cyber-logo__wordmark">
                <span class="cyber-logo__cyber">CYBER</span><span class="cyber-logo__code">CODE</span>
            </div>
        </div>
        <h1 class="status-head">SYSTEM READY</h1>
        <p>Interface loaded successfully.</p>
        <div class="status-line">
            <span class="dot"></span> ONLINE
        </div>
        <button type="button" onclick="initSequence()">INITIALIZE</button>
    </div>
</div>`,
    css: `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Share+Tech+Mono&display=swap');
body { background:#050505; color:#e9ecef; font-family:'Share Tech Mono',monospace; display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; }
.container { position:relative; z-index:1; }
.card { background:#111; border:1px solid #333; padding:2rem; text-align:center; position:relative; box-shadow:0 0 20px rgba(0,0,0,.8); }
.card::before { content:''; position:absolute; top:-2px; left:-2px; width:15px; height:15px; border-top:2px solid #ff7300; border-left:2px solid #ff7300; }
.card::after { content:''; position:absolute; bottom:-2px; right:-2px; width:15px; height:15px; border-bottom:2px solid #ff7300; border-right:2px solid #ff7300; }
.cyber-logo { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:1.25rem; padding-bottom:1rem; border-bottom:1px solid #2a2a2a; }
.cyber-logo__glyph { font-size:1.75rem; color:#ff7300; text-shadow:0 0 12px rgba(255,115,0,.45); }
.cyber-logo__wordmark { font-family:Orbitron,sans-serif; font-weight:700; font-size:1.35rem; letter-spacing:.2em; text-transform:uppercase; }
.cyber-logo__cyber { color:#ff7300; }
.cyber-logo__code { color:#e9ecef; }
h1.status-head { color:#ff7300; letter-spacing:2px; margin:0 0 10px; font-size:1.15rem; text-shadow:0 0 10px rgba(255,115,0,.5); }
.status-line { display:flex; align-items:center; justify-content:center; gap:10px; color:#28a745; margin:20px 0; }
.dot { width:8px; height:8px; background:#28a745; border-radius:50%; box-shadow:0 0 8px #28a745; animation:pulse 1s infinite; }
button { background:transparent; border:1px solid #ff7300; color:#ff7300; padding:10px 20px; font-family:inherit; cursor:pointer; text-transform:uppercase; font-weight:bold; }
button:hover { background:#ff7300; color:#000; }
@keyframes pulse { 0%{opacity:.5} 50%{opacity:1} 100%{opacity:.5} }`,
    js: `function initSequence() {
    var btn = document.querySelector('button');
    var h1 = document.querySelector('h1.status-head');
    if (!btn || !h1) return;
    btn.innerText = 'PROCESSING...';
    setTimeout(function () {
        h1.innerText = 'ACCESS GRANTED';
        h1.style.color = '#28a745';
        btn.innerText = 'SYSTEM ACTIVE';
        btn.style.pointerEvents = 'none';
    }, 800);
}
console.log('Cyber preview: idle.');`,
};

function escapeInlineClosingStyle(css) {
    return String(css ?? '').replace(/<\/style/gi, '<\\/style');
}

function escapeInlineClosingScript(js) {
    return String(js ?? '').replace(/<\/script/gi, '<\\/script');
}

function loadInitialProjectContent() {
    const out = {
        html: defaultCyberProject.html,
        css: defaultCyberProject.css,
        js: defaultCyberProject.js,
    };
    try {
        const raw = localStorage.getItem(AUTO_SAVED_PROJECT_KEY);
        if (raw) {
            const p = JSON.parse(raw);
            if (p && typeof p === 'object') {
                if (typeof p.html === 'string') out.html = p.html;
                if (typeof p.css === 'string') out.css = p.css;
                if (typeof p.js === 'string') out.js = p.js;
            }
        } else {
            const sh = localStorage.getItem(SPLIT_HTML_KEY);
            const sc = localStorage.getItem(SPLIT_CSS_KEY);
            const sj = localStorage.getItem(SPLIT_JS_KEY);
            if (sh !== null) out.html = sh;
            if (sc !== null) out.css = sc;
            if (sj !== null) out.js = sj;
            try {
                const leg = localStorage.getItem(EDITOR_BUFFER_KEY);
                if (leg != null && String(leg).trim().length > 0) {
                    out.html = String(leg);
                }
            } catch (e2) {
                /* ignore */
            }
        }
    } catch (e) {
        console.warn('loadInitialProjectContent:', e);
    }
    return out;
}

function buildIframeSrcdocFromEditors() {
    if (!editors.html || !editors.css || !editors.js) return '';
    const h = editors.html.getValue();
    const c = escapeInlineClosingStyle(editors.css.getValue());
    const j = escapeInlineClosingScript(editors.js.getValue());
    /* Bez allow-same-origin na iframe sandbox=... origin podgladu jest "null" i parent jest cross-origin — blad przy parent.showAlertModal itd. */
    const userJsWrapped =
        '(function(){try{' +
        j +
        '}catch(e){console.error("JS (bufor):",e);}})();';
    return (
        '<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8">' +
        '<meta name="viewport" content="width=device-width,initial-scale=1">' +
        '<style>' +
        c +
        '</style></head><body>' +
        h +
        '<script>' +
        userJsWrapped +
        '<\/script></body></html>'
    );
}

/**
 * Rozbija wczytany plik HTML na trzy bufory jak w podgladzie: body (bez inline style/script),
 * suma <style>, suma inline <script> (zewnetrzne src tylko jako komentarz).
 */
function splitLoadedHtmlFileIntoBuffers(raw) {
    const trimmed = String(raw ?? '').trim();
    if (!trimmed) {
        return { html: '', css: '', js: '' };
    }

    const doc = new DOMParser().parseFromString(trimmed, 'text/html');

    const css = Array.from(doc.querySelectorAll('style'))
        .map((el) => el.textContent)
        .join('\n\n')
        .trim();

    const jsChunks = [];
    doc.querySelectorAll('script').forEach((el) => {
        const src = el.getAttribute('src');
        if (src && String(src).trim()) {
            jsChunks.push('// External script (nie wczytano): ' + String(src).trim());
            return;
        }
        const t = el.textContent;
        if (t && t.trim()) {
            jsChunks.push(t.trim());
        }
    });
    const js = jsChunks.join('\n\n').trim();

    let html = '';
    if (doc.body) {
        const clone = doc.body.cloneNode(true);
        clone.querySelectorAll('style').forEach((n) => n.remove());
        clone.querySelectorAll('script').forEach((n) => n.remove());
        html = clone.innerHTML.trim();
    } else {
        html = trimmed;
    }

    return { html, css, js };
}

function applyBuffersToEditors(parts) {
    if (!editors.html || !editors.css || !editors.js) return;
    editors.html.setValue(parts.html != null ? String(parts.html) : '');
    editors.css.setValue(parts.css != null ? String(parts.css) : '');
    editors.js.setValue(parts.js != null ? String(parts.js) : '');
}

let projectAutoSaveTimer = null;
function scheduleAutoSavedProject() {
    window.clearTimeout(projectAutoSaveTimer);
    projectAutoSaveTimer = window.setTimeout(() => {
        projectAutoSaveTimer = null;
        if (!editors.html || !editors.css || !editors.js) return;
        try {
            localStorage.setItem(
                AUTO_SAVED_PROJECT_KEY,
                JSON.stringify({
                    html: editors.html.getValue(),
                    css: editors.css.getValue(),
                    js: editors.js.getValue(),
                    timestamp: new Date().toISOString(),
                }),
            );
        } catch (e) {
            console.warn('autoSavedProject:', e);
        }
    }, 500);
}

function readWorkspaceLayoutState() {
    try {
        const raw = localStorage.getItem(WORKSPACE_LAYOUT_KEY);
        if (!raw) {
            return { previewHidden: false, editorHidden: false, expanded: false };
        }
        const o = JSON.parse(raw);
        return {
            previewHidden: Boolean(o.previewHidden),
            editorHidden: Boolean(o.editorHidden),
            expanded: Boolean(o.expanded),
        };
    } catch (e) {
        return { previewHidden: false, editorHidden: false, expanded: false };
    }
}

function normalizeUiTheme(theme) {
    return theme === 'light' ? 'light' : 'dark';
}

function getUiTheme() {
    return normalizeUiTheme(localStorage.getItem(THEME_KEY) || 'dark');
}

function setUiTheme(theme, opts) {
    const t = normalizeUiTheme(theme);
    localStorage.setItem(THEME_KEY, t);

    const root = document.documentElement;
    const switching = Boolean(opts && opts.instant !== true);

    if (switching) root.classList.add('theme-switching');
    root.setAttribute('theme', t);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => root.classList.remove('theme-switching'));
    });

    applyEditorOptions();
    updateThemeToggleUi();
}

function toggleUiTheme() {
    setUiTheme(getUiTheme() === 'dark' ? 'light' : 'dark');
}

function updateThemeToggleUi() {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    const t = getUiTheme();
    const label = btn.querySelector('.header-icon-btn__text');
    if (label) {
        label.textContent = t === 'dark' ? 'MOTYW: CIEMNY' : 'MOTYW: JASNY';
    }
    btn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
    const icon = btn.querySelector('.header-icon-btn__i');
    if (icon) {
        icon.className =
            'fa-solid header-icon-btn__i ' + (t === 'dark' ? 'fa-moon' : 'fa-sun');
    }
}

let editorSettings = {
    fontSize: 14,
    fontFamily: '"JetBrains Mono", monospace',
    lineHeight: 0,
    wordWrap: 'off',
    minimap: true,
    lineNumbers: 'on',
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    tabSize: 4,
    insertSpaces: true,
    renderWhitespace: 'none',
    renderLineHighlight: 'all',
    renderIndentGuides: true,
    cursorStyle: 'line',
    cursorBlinking: 'blink',
    scrollBeyondLastLine: true,
    smoothScrolling: false,
    mouseWheelZoom: false,
    // Procentowy krok zoomu kolka myszy (Ctrl/Cmd + scroll) wzgledem aktualnego fontSize
    // Przyklad: 10 przy fontSize=14 => +/- 1.4px na tick (zaokraglane)
    mouseWheelZoomPercent: 10,
    roundedSelection: false,
    formatOnPaste: false,
    formatOnType: false,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    quickSuggestions: { other: true, comments: false, strings: true },
    quickSuggestionsDelay: 100,
    autoIndent: 'full',
    bracketPairColorization: true,
    colorDecorators: true,
    folding: true,
    showFoldingControls: 'mouseover',
    matchBrackets: 'always',
    occurrencesHighlight: true,
    selectionHighlight: true,
    codeLens: false,
    links: true,
    multiCursorModifier: 'alt',
    dragAndDrop: true,
    emptySelectionClipboard: true,
    copyWithSyntaxHighlighting: true,
    cursorSmoothCaretAnimation: false,
    cursorSurroundingLines: 0,
    cursorSurroundingLinesStyle: 'default',
    stickyScroll: { enabled: false },
    guides: { bracketPairs: true }
};

const elements = {
    settingsSidebar: {
        get overlay() { return document.getElementById('settingsOverlay'); },
        get sidebar() { return document.getElementById('settingsSidebar'); },
        get body() { return document.getElementById('settingsSidebarBody'); }
    }
};

const _wheelZoomCleanups = [];

/** Legacy API (MonacoEditorSettings); edytory trzyma `editors`. */
function setEditors() {
    /* no-op — instancje tworzone w require(['vs/editor/editor.main']) */
}

function disposeWheelZoomHandlers() {
    while (_wheelZoomCleanups.length) {
        const fn = _wheelZoomCleanups.pop();
        try {
            if (typeof fn === 'function') fn();
        } catch (e) {
            // ignore
        }
    }
}

function clampNumber(n, min, max) {
    return Math.min(max, Math.max(min, n));
}

function installWheelZoomHandler(editor) {
    if (!editor || typeof editor.getDomNode !== 'function') return;

    const dom = editor.getDomNode();
    if (!dom) return;

    const wants = Boolean(editorSettings.mouseWheelZoom);
    const pct = Number(editorSettings.mouseWheelZoomPercent);
    const percent = Number.isFinite(pct) ? clampNumber(pct, 1, 50) : 10;

    if (!wants || percent <= 0) return;

    const onWheel = (e) => {
        if (!e) return;
        const zoom = e.ctrlKey || e.metaKey;
        if (!zoom) return;

        e.preventDefault();
        e.stopPropagation();

        const cur = editor.getOption(monaco.editor.EditorOption.fontSize);
        const deltaPx = (cur * percent) / 100;
        const signed = e.deltaY < 0 ? deltaPx : -deltaPx;
        const next = clampNumber(Math.round((cur + signed) * 10) / 10, 8, 48);

        if (next === cur) return;

        editor.updateOptions({ fontSize: next });
        editorSettings.fontSize = next;
        localStorage.setItem(CODE_EDITOR_SETTINGS_KEY, JSON.stringify(editorSettings));
    };

    dom.addEventListener('wheel', onWheel, { passive: false });
    _wheelZoomCleanups.push(() => dom.removeEventListener('wheel', onWheel));
}

function refreshWheelZoomHandlers() {
    disposeWheelZoomHandlers();
    ['html', 'css', 'js'].forEach((k) => {
        if (editors[k]) installWheelZoomHandler(editors[k]);
    });
}

function loadSettings() {
    const saved = localStorage.getItem(CODE_EDITOR_SETTINGS_KEY);
    if (saved) {
        try {
            editorSettings = { ...editorSettings, ...JSON.parse(saved) };
        } catch (e) {
            console.warn('Nie mozna odczytac ustawien edytora.');
        }
    }
}

function getEditorOptions() {
    const currentTheme = localStorage.getItem(THEME_KEY) || 'dark';
    const monacoTheme = currentTheme === 'dark' ? 'terminal-dark' : 'terminal-light';

    const wantsMouseWheelZoom = editorSettings.mouseWheelZoom === true;

    return {
        fontSize: editorSettings.fontSize,
        fontFamily: editorSettings.fontFamily,
        lineHeight: editorSettings.lineHeight || 0,
        automaticLayout: true,
        glyphMargin: true,
        lightbulb: { enabled: true },
        wordWrap: editorSettings.wordWrap || 'off',
        minimap: { enabled: editorSettings.minimap },
        lineNumbers: editorSettings.lineNumbers || 'on',
        lineNumbersMinChars: 2,
        lineDecorationsWidth: 8,
        theme: monacoTheme,
        cursorBlinking: editorSettings.cursorBlinking || 'blink',
        cursorStyle: editorSettings.cursorStyle || 'line',
        cursorSmoothCaretAnimation: editorSettings.cursorSmoothCaretAnimation || false,
        cursorSurroundingLines: editorSettings.cursorSurroundingLines || 0,
        cursorSurroundingLinesStyle: editorSettings.cursorSurroundingLinesStyle || 'default',
        scrollBeyondLastLine: editorSettings.scrollBeyondLastLine !== false,
        roundedSelection: editorSettings.roundedSelection || false,
        renderLineHighlight: editorSettings.renderLineHighlight || 'all',
        renderIndentGuides: editorSettings.renderIndentGuides !== false,
        tabSize: editorSettings.tabSize || 4,
        insertSpaces: editorSettings.insertSpaces !== false,
        renderWhitespace: editorSettings.renderWhitespace || 'none',
        formatOnPaste: editorSettings.formatOnPaste || false,
        formatOnType: editorSettings.formatOnType || false,
        autoIndent: editorSettings.autoIndent || 'full',
        bracketPairColorization: { enabled: editorSettings.bracketPairColorization !== false },
        matchBrackets: editorSettings.matchBrackets || 'always',
        guides: editorSettings.guides || { bracketPairs: true },
        autoClosingBrackets: editorSettings.autoClosingBrackets || 'always',
        autoClosingQuotes: editorSettings.autoClosingQuotes || 'always',
        suggestOnTriggerCharacters: editorSettings.suggestOnTriggerCharacters !== false,
        acceptSuggestionOnEnter: editorSettings.acceptSuggestionOnEnter || 'on',
        acceptSuggestionOnCommitCharacter: true,
        quickSuggestions: editorSettings.quickSuggestions || { other: true, comments: false, strings: true },
        quickSuggestionsDelay: editorSettings.quickSuggestionsDelay || 100,
        snippetSuggestions: 'top',
        wordBasedSuggestions: 'matchingDocuments',
        suggestSelection: 'first',
        tabCompletion: 'on',
        suggest: {
            showKeywords: true, showSnippets: true, showClasses: true, showFunctions: true,
            showVariables: true, showFields: true, showInterfaces: true, showStructs: true,
            showModules: true, showProperties: true, showEvents: true, showOperators: true,
            showUnits: true, showValues: true, showConstants: true, showEnums: true,
            showEnumMembers: true, showColors: true, showFiles: true, showReferences: true,
            showFolders: true, showTypeParameters: true, showIssues: true, showUsers: true,
            showText: true, showCustomcolors: true, showIcons: true
        },
        parameterHints: { enabled: true, cycle: false },
        occurrencesHighlight: editorSettings.occurrencesHighlight !== false,
        selectionHighlight: editorSettings.selectionHighlight !== false,
        colorDecorators: editorSettings.colorDecorators !== false,
        folding: editorSettings.folding !== false,
        showFoldingControls: editorSettings.showFoldingControls || 'mouseover',
        codeLens: editorSettings.codeLens || false,
        links: editorSettings.links !== false,
        // Gdy wlaczamy "Mouse Wheel Zoom" z procentowym krokiem, wylaczamy wbudowany mechanizm Monako,
        // zeby nie bylo podwojnego zoomu (nasz handler na wheel + domyslny).
        mouseWheelZoom: wantsMouseWheelZoom ? false : Boolean(editorSettings.mouseWheelZoom),
        multiCursorModifier: editorSettings.multiCursorModifier || 'alt',
        dragAndDrop: editorSettings.dragAndDrop !== false,
        emptySelectionClipboard: editorSettings.emptySelectionClipboard !== false,
        copyWithSyntaxHighlighting: editorSettings.copyWithSyntaxHighlighting !== false,
        smoothScrolling: editorSettings.smoothScrolling || false,
        stickyScroll: editorSettings.stickyScroll || { enabled: false }
    };
}

function applyMonacoTheme(themeName) {
    if (!themeName) return;
    if (typeof monaco === 'undefined' || !monaco.editor || typeof monaco.editor.setTheme !== 'function') return;
    try {
        monaco.editor.setTheme(themeName);
    } catch (e) {
        console.warn('Nie udalo sie ustawic motywu Monaco:', e);
    }
}

function applyMonacoEditorUpdateOptions(editor, opts) {
    if (!editor || typeof editor.updateOptions !== 'function' || !opts) return;

    const next = { ...opts };
    const themeName = next.theme;
    delete next.theme;

    try {
        editor.updateOptions(next);
    } catch (e) {
        console.error('Blad updateOptions() dla edytora Monaco:', e);
        return;
    }

    applyMonacoTheme(themeName);
}

function applyEditorOptions() {
    const opts = getEditorOptions();
    ['html', 'css', 'js'].forEach((k) => {
        if (editors[k]) applyMonacoEditorUpdateOptions(editors[k], opts);
    });
    refreshWheelZoomHandlers();
}

// Motyw UI (atrybut `theme` na :root) + synchronizacja Monaco po zdefiniowaniu applyEditorOptions
setUiTheme(getUiTheme(), { instant: true });
updateThemeToggleUi();

function buildJaSelect(settingKey, options, currentValue) {
    const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    const currentOption = options.find((o) => String(o.value) === String(currentValue));
    const currentLabel = currentOption ? currentOption.label : options[0].label;
    const items = options
        .map((o) =>
            `<div class="ja-select-item ${String(o.value) === String(currentValue) ? 'ja-selected' : ''}" data-value="${esc(o.value)}"><span class="ja-select-prefix">»</span>${esc(o.label)}</div>`
        )
        .join('');
    return `<div class="ja-select-wrap" data-setting="${esc(settingKey)}">
  <button type="button" class="ja-select-btn">
    <span class="ja-select-label">${esc(currentLabel)}</span>
    <span class="ja-select-arrow">▼</span>
  </button>
  <div class="ja-select-list">${items}</div>
</div>`;
}

function bindJaSelects(container) {
    if (!container) return;
    const closeAll = () => {
        document.querySelectorAll('.ja-select-list.ja-visible').forEach((list) => list.classList.remove('ja-visible'));
        document.querySelectorAll('.ja-select-btn.ja-open').forEach((btn) => btn.classList.remove('ja-open'));
    };
    container.querySelectorAll('.ja-select-wrap').forEach((wrap) => {
        const btn = wrap.querySelector('.ja-select-btn');
        const list = wrap.querySelector('.ja-select-list');
        const labelEl = wrap.querySelector('.ja-select-label');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = list.classList.contains('ja-visible');
            closeAll();
            if (!isOpen) {
                list.classList.add('ja-visible');
                btn.classList.add('ja-open');
            }
        });
        wrap.querySelectorAll('.ja-select-item').forEach((item) => {
            item.addEventListener('click', () => {
                const key = wrap.dataset.setting;
                let v = item.getAttribute('data-value');
                if (v === 'true') v = true;
                else if (v === 'false') v = false;
                updateSetting(key, v);
                const prefix = item.querySelector('.ja-select-prefix');
                labelEl.textContent = prefix ? item.textContent.replace(prefix.textContent, '').trim() : item.textContent.trim();
                wrap.querySelectorAll('.ja-select-item').forEach((i) => i.classList.remove('ja-selected'));
                item.classList.add('ja-selected');
                list.classList.remove('ja-visible');
                btn.classList.remove('ja-open');
            });
        });
    });
    if (!window._jaSelectDocBound) {
        window._jaSelectDocBound = true;
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ja-select-wrap')) return;
            closeAll();
        });
    }
}

function closeSettings() {
    const s = elements.settingsSidebar;
    if (s.sidebar) s.sidebar.classList.remove('active');
    if (s.overlay) s.overlay.classList.remove('active');
}

function switchSettingsTab(tabId) {
    document.querySelectorAll('.settings-tab').forEach((el) => el.classList.remove('active'));
    document.querySelectorAll('.settings-tab-content').forEach((el) => el.classList.remove('active'));
    const tab = document.querySelector('.settings-tab[data-tab="' + tabId + '"]');
    if (tab) tab.classList.add('active');
    const content = document.getElementById('settings-' + tabId);
    if (content) content.classList.add('active');
}

function updateSetting(key, value) {
    if (key === 'uiTheme') {
        setUiTheme(value);
        return;
    }

    editorSettings[key] = value;
    localStorage.setItem(CODE_EDITOR_SETTINGS_KEY, JSON.stringify(editorSettings));
    applyEditorOptions();

    if (key === 'mouseWheelZoom') {
        syncMouseWheelZoomUi(Boolean(value));
    }
}

function syncMouseWheelZoomUi(enabled) {
    const wrap = document.getElementById('mouseWheelZoomExtra');
    if (!wrap) return;
    wrap.style.display = enabled ? '' : 'none';
}

function showSettings() {
    const sb = elements.settingsSidebar.body;
    const s = elements.settingsSidebar;
    if (!sb || !s.sidebar || !s.overlay) return;
    const html = `
<div class="settings-tabs">
    <div class="settings-tab active" data-tab="general" onclick="switchSettingsTab('general')"><i class="fas fa-cog settings-tab-icon"></i> GENERAL</div>
    <div class="settings-tab" data-tab="cursor" onclick="switchSettingsTab('cursor')"><i class="fas fa-mouse-pointer settings-tab-icon"></i> CURSOR</div>
    <div class="settings-tab" data-tab="formatting" onclick="switchSettingsTab('formatting')"><i class="fas fa-code settings-tab-icon"></i> FORMATTING</div>
    <div class="settings-tab" data-tab="display" onclick="switchSettingsTab('display')"><i class="fas fa-eye settings-tab-icon"></i> DISPLAY</div>
    <div class="settings-tab" data-tab="advanced" onclick="switchSettingsTab('advanced')"><i class="fas fa-sliders-h settings-tab-icon"></i> ADVANCED</div>
</div>
<div id="settings-general" class="settings-tab-content active">
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-circle-half-stroke setting-icon"></i> Motyw UI + Monaco</label>
        ${buildJaSelect('uiTheme', [{ value: 'dark', label: 'CIEMNY' }, { value: 'light', label: 'JASNY' }], getUiTheme())}
    </div>
    <div class="setting-item setting-range">
        <label class="setting-label"><i class="fas fa-font setting-icon"></i> Font Size</label>
        <div class="setting-control">
            <input type="range" min="10" max="24" value="${editorSettings.fontSize}" onchange="updateSetting('fontSize', parseInt(this.value))" oninput="this.nextElementSibling.textContent = this.value + 'px'">
            <span class="setting-value">${editorSettings.fontSize}px</span>
        </div>
    </div>
    <div class="setting-item setting-range">
        <label class="setting-label"><i class="fas fa-text-height setting-icon"></i> Line Height</label>
        <div class="setting-control">
            <input type="range" min="0" max="50" value="${editorSettings.lineHeight || 0}" onchange="updateSetting('lineHeight', parseInt(this.value))" oninput="this.nextElementSibling.textContent = (this.value == 0 ? 'Auto' : this.value + 'px')">
            <span class="setting-value">${editorSettings.lineHeight === 0 ? 'Auto' : editorSettings.lineHeight + 'px'}</span>
        </div>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-font setting-icon"></i> Font Family</label>
        ${buildJaSelect('fontFamily', [
        { value: '"JetBrains Mono", monospace', label: 'JetBrains Mono' },
        { value: '"Share Tech Mono", monospace', label: 'Share Tech Mono' },
        { value: '"Courier New", monospace', label: 'Courier New' },
        { value: 'monospace', label: 'System Monospace' }
    ], editorSettings.fontFamily)}
    </div>
    <div class="setting-item setting-range">
        <label class="setting-label"><i class="fas fa-indent setting-icon"></i> Tab Size</label>
        <div class="setting-control">
            <input type="range" min="2" max="8" value="${editorSettings.tabSize}" onchange="updateSetting('tabSize', parseInt(this.value))" oninput="this.nextElementSibling.textContent = this.value">
            <span class="setting-value">${editorSettings.tabSize}</span>
        </div>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-text-width setting-icon"></i> Word Wrap</label>
        ${buildJaSelect('wordWrap', [{ value: 'on', label: 'ON' }, { value: 'off', label: 'OFF' }], editorSettings.wordWrap)}
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-map setting-icon"></i> Minimap <input type="checkbox" ${editorSettings.minimap ? 'checked' : ''} onchange="updateSetting('minimap', this.checked)"></label>
    </div>
</div>
<div id="settings-cursor" class="settings-tab-content">
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-mouse-pointer setting-icon"></i> Cursor Style</label>
        ${buildJaSelect('cursorStyle', [
        { value: 'line', label: 'LINE' }, { value: 'block', label: 'BLOCK' },
        { value: 'underline', label: 'UNDERLINE' }, { value: 'line-thin', label: 'LINE THIN' },
        { value: 'block-outline', label: 'BLOCK OUTLINE' }
    ], editorSettings.cursorStyle)}
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-circle setting-icon"></i> Cursor Blinking</label>
        ${buildJaSelect('cursorBlinking', [
        { value: 'blink', label: 'BLINK' }, { value: 'smooth', label: 'SMOOTH' },
        { value: 'phase', label: 'PHASE' }, { value: 'expand', label: 'EXPAND' },
        { value: 'solid', label: 'SOLID' }
    ], editorSettings.cursorBlinking)}
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-magic setting-icon"></i> Smooth Caret Animation <input type="checkbox" ${editorSettings.cursorSmoothCaretAnimation ? 'checked' : ''} onchange="updateSetting('cursorSmoothCaretAnimation', this.checked)"></label>
    </div>
</div>
<div id="settings-formatting" class="settings-tab-content">
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-brackets-curly setting-icon"></i> Auto Close Brackets</label>
        ${buildJaSelect('autoClosingBrackets', [
        { value: 'always', label: 'ALWAYS' }, { value: 'languageDefined', label: 'LANGUAGE DEFINED' },
        { value: 'beforeWhitespace', label: 'BEFORE WHITESPACE' }, { value: 'never', label: 'NEVER' }
    ], editorSettings.autoClosingBrackets)}
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-quote-right setting-icon"></i> Auto Close Quotes</label>
        ${buildJaSelect('autoClosingQuotes', [
        { value: 'always', label: 'ALWAYS' }, { value: 'languageDefined', label: 'LANGUAGE DEFINED' },
        { value: 'beforeWhitespace', label: 'BEFORE WHITESPACE' }, { value: 'never', label: 'NEVER' }
    ], editorSettings.autoClosingQuotes)}
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-palette setting-icon"></i> Bracket Pair Colorization <input type="checkbox" ${editorSettings.bracketPairColorization ? 'checked' : ''} onchange="updateSetting('bracketPairColorization', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-code-branch setting-icon"></i> Folding <input type="checkbox" ${editorSettings.folding ? 'checked' : ''} onchange="updateSetting('folding', this.checked)"></label>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-indent setting-icon"></i> Insert Spaces</label>
        ${buildJaSelect('insertSpaces', [{ value: true, label: 'SPACES' }, { value: false, label: 'TABS' }], editorSettings.insertSpaces)}
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-align-left setting-icon"></i> Auto Indent</label>
        ${buildJaSelect('autoIndent', [
        { value: 'none', label: 'NONE' }, { value: 'keep', label: 'KEEP' },
        { value: 'brackets', label: 'BRACKETS' }, { value: 'advanced', label: 'ADVANCED' },
        { value: 'full', label: 'FULL' }
    ], editorSettings.autoIndent)}
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-paste setting-icon"></i> Format on Paste <input type="checkbox" ${editorSettings.formatOnPaste ? 'checked' : ''} onchange="updateSetting('formatOnPaste', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-keyboard setting-icon"></i> Format on Type <input type="checkbox" ${editorSettings.formatOnType ? 'checked' : ''} onchange="updateSetting('formatOnType', this.checked)"></label>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-brackets-curly setting-icon"></i> Match Brackets</label>
        ${buildJaSelect('matchBrackets', [
        { value: 'always', label: 'ALWAYS' }, { value: 'near', label: 'NEAR' },
        { value: 'never', label: 'NEVER' }
    ], editorSettings.matchBrackets)}
    </div>
</div>
<div id="settings-display" class="settings-tab-content">
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-eye-slash setting-icon"></i> Render Whitespace</label>
        ${buildJaSelect('renderWhitespace', [
        { value: 'none', label: 'NONE' }, { value: 'boundary', label: 'BOUNDARY' },
        { value: 'selection', label: 'SELECTION' }, { value: 'trailing', label: 'TRAILING' },
        { value: 'all', label: 'ALL' }
    ], editorSettings.renderWhitespace)}
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-align-left setting-icon"></i> Render Indent Guides <input type="checkbox" ${editorSettings.renderIndentGuides ? 'checked' : ''} onchange="updateSetting('renderIndentGuides', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-arrows-alt-v setting-icon"></i> Scroll Beyond Last Line <input type="checkbox" ${editorSettings.scrollBeyondLastLine ? 'checked' : ''} onchange="updateSetting('scrollBeyondLastLine', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-search-plus setting-icon"></i> Mouse Wheel Zoom <input type="checkbox" ${editorSettings.mouseWheelZoom ? 'checked' : ''} onchange="updateSetting('mouseWheelZoom', this.checked)"></label>
    </div>
    <div id="mouseWheelZoomExtra" class="setting-item setting-range" style="display:${editorSettings.mouseWheelZoom ? '' : 'none'}">
        <label class="setting-label"><i class="fas fa-percent setting-icon"></i> Krok zoomu wzgledem fontu (1 tick, Ctrl/Cmd + scroll)</label>
        <div class="setting-control">
            <input type="range" min="1" max="50" step="1" value="${editorSettings.mouseWheelZoomPercent || 10}" onchange="updateSetting('mouseWheelZoomPercent', parseInt(this.value))" oninput="this.nextElementSibling.textContent = this.value + '%'">
            <span class="setting-value">${(editorSettings.mouseWheelZoomPercent || 10)}%</span>
        </div>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-highlighter setting-icon"></i> Occurrences Highlight <input type="checkbox" ${editorSettings.occurrencesHighlight ? 'checked' : ''} onchange="updateSetting('occurrencesHighlight', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-marker setting-icon"></i> Selection Highlight <input type="checkbox" ${editorSettings.selectionHighlight ? 'checked' : ''} onchange="updateSetting('selectionHighlight', this.checked)"></label>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-highlighter setting-icon"></i> Render Line Highlight</label>
        ${buildJaSelect('renderLineHighlight', [
        { value: 'none', label: 'NONE' }, { value: 'gutter', label: 'GUTTER' },
        { value: 'line', label: 'LINE' }, { value: 'all', label: 'ALL' }
    ], editorSettings.renderLineHighlight)}
    </div>
</div>
<div id="settings-advanced" class="settings-tab-content">
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-palette setting-icon"></i> Color Decorators <input type="checkbox" ${editorSettings.colorDecorators ? 'checked' : ''} onchange="updateSetting('colorDecorators', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-link setting-icon"></i> Links <input type="checkbox" ${editorSettings.links !== false ? 'checked' : ''} onchange="updateSetting('links', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-code setting-icon"></i> Code Lens <input type="checkbox" ${editorSettings.codeLens ? 'checked' : ''} onchange="updateSetting('codeLens', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-mouse setting-icon"></i> Drag and Drop <input type="checkbox" ${editorSettings.dragAndDrop !== false ? 'checked' : ''} onchange="updateSetting('dragAndDrop', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-copy setting-icon"></i> Empty Selection Clipboard <input type="checkbox" ${editorSettings.emptySelectionClipboard !== false ? 'checked' : ''} onchange="updateSetting('emptySelectionClipboard', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-highlighter setting-icon"></i> Copy with Syntax Highlighting <input type="checkbox" ${editorSettings.copyWithSyntaxHighlighting !== false ? 'checked' : ''} onchange="updateSetting('copyWithSyntaxHighlighting', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-sliders-h setting-icon"></i> Smooth Scrolling <input type="checkbox" ${editorSettings.smoothScrolling ? 'checked' : ''} onchange="updateSetting('smoothScrolling', this.checked)"></label>
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-circle setting-icon"></i> Rounded Selection <input type="checkbox" ${editorSettings.roundedSelection ? 'checked' : ''} onchange="updateSetting('roundedSelection', this.checked)"></label>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-mouse-pointer setting-icon"></i> Multi Cursor Modifier</label>
        ${buildJaSelect('multiCursorModifier', [
        { value: 'ctrlCmd', label: 'CTRL/CMD' },
        { value: 'alt', label: 'ALT' }
    ], editorSettings.multiCursorModifier)}
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-code-branch setting-icon"></i> Show Folding Controls</label>
        ${buildJaSelect('showFoldingControls', [
        { value: 'always', label: 'ALWAYS' }, { value: 'mouseover', label: 'MOUSEOVER' },
        { value: 'never', label: 'NEVER' }
    ], editorSettings.showFoldingControls)}
    </div>
    <div class="setting-item">
        <label class="setting-label"><i class="fas fa-lightbulb setting-icon"></i> Suggest on Trigger Characters <input type="checkbox" ${editorSettings.suggestOnTriggerCharacters !== false ? 'checked' : ''} onchange="updateSetting('suggestOnTriggerCharacters', this.checked)"></label>
    </div>
    <div class="setting-item setting-select">
        <label class="setting-label"><i class="fas fa-keyboard setting-icon"></i> Accept Suggestion on Enter</label>
        ${buildJaSelect('acceptSuggestionOnEnter', [
        { value: 'on', label: 'ON' }, { value: 'smart', label: 'SMART' },
        { value: 'off', label: 'OFF' }
    ], editorSettings.acceptSuggestionOnEnter)}
    </div>
    <div class="setting-item setting-range">
        <label class="setting-label"><i class="fas fa-clock setting-icon"></i> Quick Suggestions Delay</label>
        <div class="setting-control">
            <input type="range" min="0" max="1000" step="50" value="${editorSettings.quickSuggestionsDelay || 100}" onchange="updateSetting('quickSuggestionsDelay', parseInt(this.value))" oninput="this.nextElementSibling.textContent = this.value + 'ms'">
            <span class="setting-value">${editorSettings.quickSuggestionsDelay || 100}ms</span>
        </div>
    </div>
</div>`;
    sb.innerHTML = html;
    bindJaSelects(sb);
    syncMouseWheelZoomUi(Boolean(editorSettings.mouseWheelZoom));
    s.sidebar.classList.add('active');
    s.overlay.classList.add('active');
}

if (typeof window !== 'undefined') {
    window.MonacoEditorSettings = {
        loadSettings,
        getEditorOptions,
        applyEditorOptions,
        setEditors,
        getMonacoEditors: () => ({ ...editors }),
        showSettings,
        closeSettings,
        switchSettingsTab,
        updateSetting,
        getUiTheme,
        setUiTheme,
        toggleUiTheme
    };
    /* Szablon ustawien ma inline onclick/onchange — musza byc na window (global scope). */
    window.switchSettingsTab = switchSettingsTab;
    window.updateSetting = updateSetting;
    window.showSettings = showSettings;
    window.closeSettings = closeSettings;
    window.syncMouseWheelZoomUi = syncMouseWheelZoomUi;
}

/**
 * Naglowek (USTAWIENIA / motyw) — nie moze czekac na Monaco; inaczej przy bledzie CDN cala reszta initu nie dochodzi do addEventListener.
 */
(function wireCoreHeaderButtons() {
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    if (openSettingsBtn && !openSettingsBtn.dataset.oxyWired) {
        openSettingsBtn.dataset.oxyWired = '1';
        openSettingsBtn.addEventListener('click', () => {
            showSettings();
        });
    }
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn && !themeToggleBtn.dataset.oxyWired) {
        themeToggleBtn.dataset.oxyWired = '1';
        themeToggleBtn.addEventListener('click', () => {
            toggleUiTheme();
        });
    }
})();

require(['vs/editor/editor.main'], function () {
    defineMonacoThemes();
    configureMonacoLanguageService();
    loadSettings();

    if (window.monaco?.languages?.css?.scssDefaults) {
        try {
            monaco.languages.css.scssDefaults.setDiagnosticsOptions({ validate: true });
        } catch (e) {
            /* ignore */
        }
    }

    const TAB_LANG = { html: 'html', css: 'scss', js: 'javascript' };

    function setBufferFormatLabelForTab(tabId) {
        const el = document.getElementById('bufferFormatLabel');
        if (!el) return;
        const lang = TAB_LANG[tabId] || 'plaintext';
        el.textContent = 'FORMAT: ' + lang;
    }

    const initial = loadInitialProjectContent();

    const sharedEditorOpts = {
        ...getEditorOptions(),
        letterSpacing: 0.5,
        padding: { top: 16, bottom: 16 },
        scrollbar: {
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 0,
        },
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
    };

    const elHtml = document.getElementById('html-editor');
    const elCss = document.getElementById('css-editor');
    const elJs = document.getElementById('js-editor');
    if (!elHtml || !elCss || !elJs) {
        throw new Error('Brak kontenerow #html-editor, #css-editor lub #js-editor w DOM.');
    }

    editors.html = monaco.editor.create(elHtml, {
        ...sharedEditorOpts,
        value: initial.html,
        language: 'html',
    });
    editors.css = monaco.editor.create(elCss, {
        ...sharedEditorOpts,
        value: initial.css,
        language: 'scss',
    });
    editors.js = monaco.editor.create(elJs, {
        ...sharedEditorOpts,
        value: initial.js,
        language: 'javascript',
    });

    setEditors();

    function onProjectBufferChange() {
        scheduleAutoSavedProject();
    }
    editors.html.onDidChangeModelContent(onProjectBufferChange);
    editors.css.onDidChangeModelContent(onProjectBufferChange);
    editors.js.onDidChangeModelContent(onProjectBufferChange);

    function setPreviewStatus(msg) {
        const el = document.getElementById('previewStatusLabel');
        if (el) el.textContent = 'STATUS: ' + msg;
    }

    function normalizeHtmlForIframe(raw) {
        const html = String(raw || '').trim();
        if (!html) return '';
        if (/^<!DOCTYPE/i.test(html) || /<html[\s>]/i.test(html)) return html;
        return (
            '<!DOCTYPE html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' +
            html +
            '</body></html>'
        );
    }

    function loadHtmlIntoPreview(html) {
        const frame = document.getElementById('htmlPreviewFrame');
        if (!frame) return;
        const doc = normalizeHtmlForIframe(html);
        if (!doc) {
            frame.removeAttribute('srcdoc');
            setPreviewStatus('pusty bufor');
            return;
        }
        try {
            frame.srcdoc = doc;
            setPreviewStatus('wczytano (srcdoc)');
        } catch (e) {
            setPreviewStatus('blad');
            console.error(e);
        }
    }

    function refreshPreviewFromEditors() {
        const doc = buildIframeSrcdocFromEditors();
        loadHtmlIntoPreview(doc);
        setPreviewStatus('HTML + CSS + JS (Monaco)');
    }

    function countBufferLines(s) {
        const t = String(s ?? '');
        if (!t) return 0;
        return t.split(/\r\n|\r|\n/).length;
    }

    const compileSeqBtn = document.getElementById('compileSeqBtn');
    if (compileSeqBtn) {
        compileSeqBtn.addEventListener('click', () => {
            const log = document.querySelector('.log-stream');
            const iconEl = compileSeqBtn.querySelector('.panel-action-btn__icon i');
            let prevIconClass = '';
            compileSeqBtn.classList.add('is-busy');
            compileSeqBtn.setAttribute('aria-busy', 'true');
            if (iconEl) {
                prevIconClass = iconEl.className;
                iconEl.className = 'fa-solid fa-spinner fa-spin';
            }
            if (log) log.textContent = 'EVENT_LOG: COMPILING SEQUENCE...';

            window.setTimeout(() => {
                refreshPreviewFromEditors();
                if (log) log.textContent = 'EVENT_LOG: COMPILING SEQUENCE... [OK]';
                compileSeqBtn.classList.remove('is-busy');
                compileSeqBtn.removeAttribute('aria-busy');
                if (iconEl) iconEl.className = prevIconClass || 'fa-solid fa-bolt';
                if (typeof showHudToast === 'function') {
                    showHudToast('COMPILE_SEQ', 'Podgląd iframe zaktualizowany.', 'default');
                }
            }, 380);
        });
    }

    const dumpLogBtn = document.getElementById('dumpLogBtn');
    if (dumpLogBtn) {
        dumpLogBtn.addEventListener('click', async () => {
            const log = document.querySelector('.log-stream');
            const h = editors.html ? editors.html.getValue() : '';
            const c = editors.css ? editors.css.getValue() : '';
            const j = editors.js ? editors.js.getValue() : '';
            const bh = h.length;
            const bc = c.length;
            const bj = j.length;
            const lh = countBufferLines(h);
            const lc = countBufferLines(c);
            const lj = countBufferLines(j);
            const total = bh + bc + bj;
            const linesSum = lh + lc + lj;
            const stamp = new Date().toISOString();
            const report = [
                'OXY_OS // BUFFER DUMP',
                'ts: ' + stamp,
                'html: ' + bh + ' B, lines: ' + lh,
                'css:  ' + bc + ' B, lines: ' + lc,
                'js:   ' + bj + ' B, lines: ' + lj,
                'total: ' + total + ' B, lines(sum): ' + linesSum,
            ].join('\n');

            let clipOk = false;
            try {
                if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
                    await navigator.clipboard.writeText(report);
                    clipOk = true;
                }
            } catch (e) {
                /* brak uprawnien / kontekst nie-HTTPS */
            }

            if (log) {
                log.textContent =
                    'EVENT_LOG: DUMP ' +
                    total +
                    ' B | L' +
                    linesSum +
                    (clipOk ? ' | SCHOWEK: OK' : ' | SCHOWEK: —');
            }

            dumpLogBtn.classList.add('is-busy');
            window.setTimeout(() => dumpLogBtn.classList.remove('is-busy'), 280);
        });
    }

    updateThemeToggleUi();

    const previewFromEditorBtn = document.getElementById('previewFromEditorBtn');
    if (previewFromEditorBtn) {
        previewFromEditorBtn.addEventListener('click', () => {
            const ic = previewFromEditorBtn.querySelector('.panel-action-btn__icon');
            if (ic) {
                ic.style.transform = 'scale(1.15)';
                window.setTimeout(() => {
                    ic.style.transform = '';
                }, 220);
            }
            refreshPreviewFromEditors();
            const log = document.querySelector('.log-stream');
            if (log) log.textContent = 'EVENT_LOG: IFRAME REFRESH (MANUAL)';
        });
    }

    const loadHtmlFileBtn = document.getElementById('loadHtmlFileBtn');
    const htmlFileInput = document.getElementById('htmlFileInput');
    if (loadHtmlFileBtn && htmlFileInput) {
        loadHtmlFileBtn.addEventListener('click', () => htmlFileInput.click());
        htmlFileInput.addEventListener('change', (ev) => {
            const f = ev.target.files && ev.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
                const text = String(reader.result ?? '');
                const parts = splitLoadedHtmlFileIntoBuffers(text);
                applyBuffersToEditors(parts);
                refreshPreviewFromEditors();
                setPreviewStatus('plik → edytory: ' + f.name);
                const tabHtml = document.getElementById('editorTabHtml');
                if (tabHtml) tabHtml.click();
            };
            reader.onerror = () => setPreviewStatus('odczyt pliku: blad');
            reader.readAsText(f);
            ev.target.value = '';
        });
    }

    const sysArch = document.querySelector('main.sys-architecture');
    const previewPanel = document.querySelector('.preview-container');
    const editorPanel = document.querySelector('.editor-container');
    const previewPanelToggleBtn = document.getElementById('previewPanelToggleBtn');
    const editorPanelToggleBtn = document.getElementById('editorPanelToggleBtn');
    const previewFullscreenBtn = document.getElementById('previewFullscreenBtn');

    function setPanelToggleContent(btn, hidden, labelShow, labelHide) {
        if (!btn) return;
        const textEl = btn.querySelector('.panel-action-btn__text');
        const iconEl = btn.querySelector('.panel-action-btn__icon i');
        const iconWhenPanelHidden = btn.dataset.iconWhenHidden || 'fa-eye';
        const iconWhenPanelVisible = btn.dataset.iconWhenVisible || 'fa-eye-slash';
        if (textEl) textEl.textContent = hidden ? labelShow : labelHide;
        if (iconEl) {
            iconEl.className =
                'fa-solid ' + (hidden ? iconWhenPanelHidden : iconWhenPanelVisible);
        }
    }

    function updatePreviewPanelToggleLabel() {
        if (!previewPanelToggleBtn || !sysArch) return;
        const hidden = sysArch.classList.contains('preview-panel-hidden');
        setPanelToggleContent(
            previewPanelToggleBtn,
            hidden,
            'POKAZ PODGLAD',
            'UKRYJ PODGLAD',
        );
    }

    function updateEditorPanelToggleLabel() {
        if (!editorPanelToggleBtn || !sysArch) return;
        const hidden = sysArch.classList.contains('editor-panel-hidden');
        setPanelToggleContent(
            editorPanelToggleBtn,
            hidden,
            'POKAZ EDYTOR',
            'UKRYJ EDYTOR',
        );
    }

    function syncPreviewPanelDomHidden() {
        if (!previewPanel || !sysArch) return;
        const hidden = sysArch.classList.contains('preview-panel-hidden');
        previewPanel.hidden = hidden;
        previewPanel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    }

    function syncEditorPanelDomHidden() {
        if (!editorPanel || !sysArch) return;
        const hidden = sysArch.classList.contains('editor-panel-hidden');
        editorPanel.hidden = hidden;
        editorPanel.setAttribute('aria-hidden', hidden ? 'true' : 'false');
    }

    function scheduleWorkspaceLayout() {
        requestAnimationFrame(() => {
            try {
                if (!sysArch || sysArch.classList.contains('editor-panel-hidden')) return;
                ['html', 'css', 'js'].forEach((k) => {
                    if (editors[k] && typeof editors[k].layout === 'function') {
                        editors[k].layout();
                    }
                });
            } catch (e) {
                /* ignore */
            }
        });
    }

    (function initEditorTabs() {
        const tabs = document.querySelectorAll('.editor-tab[data-editor-tab]');
        const panels = document.querySelectorAll('.editor-tab-panel[data-editor-panel]');
        if (!tabs.length || !panels.length) return;

        function activate(tabId) {
            tabs.forEach((btn) => {
                const on = btn.getAttribute('data-editor-tab') === tabId;
                btn.classList.toggle('is-active', on);
                btn.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            panels.forEach((panel) => {
                const on = panel.getAttribute('data-editor-panel') === tabId;
                panel.classList.toggle('is-active', on);
                panel.hidden = !on;
            });
            setBufferFormatLabelForTab(tabId);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    scheduleWorkspaceLayout();
                });
            });
        }

        tabs.forEach((btn) => {
            btn.addEventListener('click', () => {
                activate(btn.getAttribute('data-editor-tab'));
            });
        });

        const first = document.querySelector('.editor-tab.is-active[data-editor-tab]');
        setBufferFormatLabelForTab(first ? first.getAttribute('data-editor-tab') : 'html');
    })();

    window.addEventListener('resize', () => {
        scheduleWorkspaceLayout();
    });

    function updateWorkspaceExpandIcon() {
        if (!previewFullscreenBtn || !sysArch) return;
        const expanded = sysArch.classList.contains('editor-iframe-expanded');
        const icon = previewFullscreenBtn.querySelector('i');
        if (icon) {
            icon.className = expanded ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
        }
        previewFullscreenBtn.title = expanded
            ? 'Przywroc telemetrie: klik albo najechanie na lewa krawedz ekranu'
            : 'Na calosc: edytor + iframe (bez telemetrii)';
    }

    function syncTelemetryRevealDock() {
        const dock = document.getElementById('telemetryRevealDock');
        if (!dock || !sysArch) return;
        const on = sysArch.classList.contains('editor-iframe-expanded');
        document.body.classList.toggle('telemetry-reveal-dock-on', on);
        if (on) {
            dock.removeAttribute('hidden');
        } else {
            dock.setAttribute('hidden', '');
        }
        dock.setAttribute('aria-hidden', on ? 'false' : 'true');
    }

    function persistWorkspaceLayout() {
        if (!sysArch) return;
        try {
            localStorage.setItem(
                WORKSPACE_LAYOUT_KEY,
                JSON.stringify({
                    previewHidden: sysArch.classList.contains('preview-panel-hidden'),
                    editorHidden: sysArch.classList.contains('editor-panel-hidden'),
                    expanded: sysArch.classList.contains('editor-iframe-expanded'),
                }),
            );
        } catch (e) {
            /* quota / prywatne okno */
        }
    }

    function applyWorkspaceLayoutFromStorage() {
        if (!sysArch) return;
        let { previewHidden, editorHidden, expanded } = readWorkspaceLayoutState();
        if (previewHidden && editorHidden) {
            editorHidden = false;
        }
        sysArch.classList.toggle('preview-panel-hidden', previewHidden);
        sysArch.classList.toggle('editor-panel-hidden', editorHidden);
        sysArch.classList.toggle('editor-iframe-expanded', expanded);
    }

    function syncWorkspaceUiAfterLayoutChange() {
        syncPreviewPanelDomHidden();
        syncEditorPanelDomHidden();
        updatePreviewPanelToggleLabel();
        updateEditorPanelToggleLabel();
        updateWorkspaceExpandIcon();
        syncTelemetryRevealDock();
        persistWorkspaceLayout();
    }

    applyWorkspaceLayoutFromStorage();
    syncWorkspaceUiAfterLayoutChange();

    scheduleWorkspaceLayout();
    [16, 50, 150, 400, 800].forEach((ms) => {
        window.setTimeout(() => {
            scheduleWorkspaceLayout();
        }, ms);
    });

    if (previewPanelToggleBtn && sysArch) {
        previewPanelToggleBtn.addEventListener('click', () => {
            const willHide = !sysArch.classList.contains('preview-panel-hidden');
            if (willHide) {
                sysArch.classList.remove('editor-panel-hidden');
            }
            sysArch.classList.toggle('preview-panel-hidden');
            syncWorkspaceUiAfterLayoutChange();
            scheduleWorkspaceLayout();
        });
    }

    if (editorPanelToggleBtn && sysArch && editorPanel) {
        editorPanelToggleBtn.addEventListener('click', () => {
            const willHideEditor = !sysArch.classList.contains('editor-panel-hidden');
            if (willHideEditor) {
                sysArch.classList.remove('preview-panel-hidden');
            }
            sysArch.classList.toggle('editor-panel-hidden');
            syncWorkspaceUiAfterLayoutChange();
            scheduleWorkspaceLayout();
        });
    }

    if (previewFullscreenBtn && previewPanel && sysArch) {
        previewFullscreenBtn.addEventListener('click', () => {
            if (sysArch.classList.contains('preview-panel-hidden')) {
                setPreviewStatus('najpierw pokaz podglad (lewy przycisk)');
                return;
            }
            sysArch.classList.toggle('editor-iframe-expanded');
            syncWorkspaceUiAfterLayoutChange();
            scheduleWorkspaceLayout();
        });
    }

    const telemetryRevealBtn = document.getElementById('telemetryRevealBtn');
    if (telemetryRevealBtn && sysArch) {
        telemetryRevealBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!sysArch.classList.contains('editor-iframe-expanded')) return;
            sysArch.classList.remove('editor-iframe-expanded');
            syncWorkspaceUiAfterLayoutChange();
            scheduleWorkspaceLayout();
            setPreviewStatus('telemetria: przywrocona');
        });
    }

    const clearBuffersBtn = document.getElementById('clearBuffersBtn');
    const clearBuffersModal = document.getElementById('clearBuffersModal');
    const clearBuffersDialog = document.getElementById('clearBuffersDialog');
    const clearBuffersCloseBtn = document.getElementById('clearBuffersCloseBtn');
    const clearBuffersCancelBtn = document.getElementById('clearBuffersCancelBtn');
    const clearBuffersConfirmBtn = document.getElementById('clearBuffersConfirmBtn');
    let clearBuffersModalPrevFocus = null;

    function openClearBuffersModal() {
        if (!clearBuffersModal) return;
        clearBuffersModalPrevFocus = document.activeElement;
        clearBuffersModal.classList.add('active');
        if (clearBuffersDialog) clearBuffersDialog.classList.add('active');
        clearBuffersModal.setAttribute('aria-hidden', 'false');
        if (clearBuffersCancelBtn) clearBuffersCancelBtn.focus();
    }

    function closeClearBuffersModal() {
        if (!clearBuffersModal) return;
        clearBuffersModal.classList.remove('active');
        if (clearBuffersDialog) clearBuffersDialog.classList.remove('active');
        clearBuffersModal.setAttribute('aria-hidden', 'true');
        if (clearBuffersModalPrevFocus && typeof clearBuffersModalPrevFocus.focus === 'function') {
            try {
                clearBuffersModalPrevFocus.focus();
            } catch (e) {
                /* ignore */
            }
        }
        clearBuffersModalPrevFocus = null;
    }

    function performClearAllBuffers() {
        if (!editors.html || !editors.css || !editors.js) return;
        editors.html.setValue('');
        editors.css.setValue('');
        editors.js.setValue('');
        scheduleAutoSavedProject();
        refreshPreviewFromEditors();
        setPreviewStatus('bufory: puste');
        const log = document.querySelector('.log-stream');
        if (log) log.textContent = 'EVENT_LOG: CLEAR_BUFFERS [OK]';
        closeClearBuffersModal();
        if (typeof showHudToast === 'function') {
            showHudToast('BUFORY', 'Wyczyszczono HTML, CSS i JS.', 'success');
        }
    }

    if (clearBuffersBtn) {
        clearBuffersBtn.addEventListener('click', () => openClearBuffersModal());
    }
    if (clearBuffersCloseBtn) {
        clearBuffersCloseBtn.addEventListener('click', () => closeClearBuffersModal());
    }
    if (clearBuffersCancelBtn) {
        clearBuffersCancelBtn.addEventListener('click', () => closeClearBuffersModal());
    }
    if (clearBuffersConfirmBtn) {
        clearBuffersConfirmBtn.addEventListener('click', () => performClearAllBuffers());
    }
    if (clearBuffersModal) {
        const clearPanel = clearBuffersModal.querySelector('.modal-content');
        if (clearPanel) {
            clearPanel.addEventListener('click', (e) => e.stopPropagation());
        }
        clearBuffersModal.addEventListener('click', () => closeClearBuffersModal());
    }
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            clearBuffersModal &&
            clearBuffersModal.classList.contains('active')
        ) {
            e.preventDefault();
            closeClearBuffersModal();
        }
    });

    scheduleWorkspaceLayout();
});