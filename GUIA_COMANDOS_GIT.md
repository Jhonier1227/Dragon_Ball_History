# Guia Basica de Comandos Git para Este Proyecto

## Objetivo
Esta guia resume los comandos de Git que se usan con mas frecuencia en este proyecto y explica cuando usarlos.

El punto clave es este:
- `push` sube commits de tu rama al remoto.
- `merge` integra cambios entre ramas.
- Un cambio puede estar subido a GitHub y aun asi no estar en `main`.

---

## 1. Ver en que rama estoy

```powershell
git branch --show-current
```

Sirve para confirmar si estas en `main` o en otra rama antes de hacer cambios.

Tambien puedes usar:

```powershell
git status
```

Eso muestra la rama actual y si tienes archivos modificados.

---

## 2. Ver si tengo cambios sin guardar

```powershell
git status
```

Si aparecen archivos en rojo o verde, tienes cambios pendientes.

Regla practica:
- No hagas merge si no entiendes que cambios locales tienes.
- Primero confirma, guarda o descarta esos cambios.

---

## 3. Guardar cambios en mi rama

```powershell
git add .
git commit -m "Mensaje claro del cambio"
```

Ejemplo:

```powershell
git add .
git commit -m "Agrega sagas detalladas de Dragon Ball"
```

---

## 4. Subir mi rama a GitHub

```powershell
git push origin nombre-de-mi-rama
```

Ejemplo:

```powershell
git push origin codex/organizar-historia-dragon-ball
```

Si Git responde:

```text
Everything up-to-date
```

significa que tu rama local ya esta sincronizada con GitHub.
No significa necesariamente que esos cambios ya esten dentro de `main`.

---

## 5. Traer cambios nuevos desde GitHub

```powershell
git pull origin main
```

Eso actualiza tu rama local `main` con lo ultimo del remoto.

Si estas en otra rama y quieres traer lo ultimo de esa misma rama:

```powershell
git pull
```

---

## 6. Integrar una rama en main localmente

Primero entra a `main`:

```powershell
git checkout main
```

Actualiza `main`:

```powershell
git pull origin main
```

Fusiona la otra rama:

```powershell
git merge nombre-de-la-rama
```

Ejemplo:

```powershell
git merge codex/organizar-historia-dragon-ball
```

Luego sube `main`:

```powershell
git push origin main
```

---

## 7. Diferencia entre push, merge y PR

### `git push`
Sube tus commits a GitHub.

### `git merge`
Integra una rama dentro de otra.

### Pull Request
Es la solicitud de fusion desde GitHub.

Flujo real:
1. Trabajas en una rama.
2. Haces `commit`.
3. Haces `push`.
4. Abres PR en GitHub.
5. Aceptas la fusion del PR.
6. Solo en ese momento los cambios entran a `main`.

---

## 8. Ver el historial de ramas

```powershell
git log --oneline --graph --decorate --all -n 30
```

Sirve para entender:
- que ramas existen,
- cual commit esta en cada rama,
- si `main` ya contiene o no ciertos cambios.

---

## 9. Ver diferencias entre ramas

Ver commits que una rama tiene y la otra no:

```powershell
git rev-list --left-right --count main...nombre-rama
```

Ejemplo:

```powershell
git rev-list --left-right --count main...codex/organizar-historia-dragon-ball
```

Ver archivos distintos entre ramas:

```powershell
git diff --name-only main...nombre-rama
```

---

## 10. Resolver la duda mas comun

### "Ya hice push, por que no aparece en main?"

Porque `push` no mete cambios en `main`.
Solo sube tu rama.

Para que aparezca en `main`, debes:
- fusionar con `git merge`, o
- aceptar el Pull Request en GitHub.

---

## 11. Worktrees: que son y por que confunden

Un worktree es otra copia del mismo repo, pero en otra carpeta y normalmente en otra rama.

Ejemplo:
- `C:\Users\maily\Music\Dragon_Ball_History` -> `main`
- `C:\Users\maily\.codex\worktrees\0546\Dragon_Ball_History` -> otra rama

Problema comun:
- ves cambios en una carpeta,
- pero estas mirando otra rama en otra carpeta distinta.

Comando para ver worktrees:

```powershell
git worktree list
```

---

## 12. Flujo recomendado para este proyecto

### Crear o cambiar a una rama

```powershell
git checkout -b nombre-rama
```

o si ya existe:

```powershell
git checkout nombre-rama
```

### Trabajar y guardar

```powershell
git add .
git commit -m "Mensaje"
git push origin nombre-rama
```

### Pasar cambios a main

Opcion 1: Pull Request en GitHub

Opcion 2: Merge local

```powershell
git checkout main
git pull origin main
git merge nombre-rama
git push origin main
```

---

## 13. Comandos de consulta rapida

```powershell
git status
git branch -vv
git branch -a
git log --oneline --graph --decorate --all -n 20
git worktree list
```

---

## 14. Regla segura antes de cualquier accion

Antes de hacer `push`, `merge` o cambiar de rama, revisa:

```powershell
git status
git branch --show-current
```

Si haces eso siempre, evitas la mayoria de errores de flujo.
