# DevOps Challenge — Docker / K8s / Debug

Twoje zadanie:
1) **Docker Compose:** uruchom aplikację tak, by strona była dostępna na `http://localhost:8080`
2) **Kubernetes:** uruchom w namespace `challenge` i wystaw przez Ingress np. w minikube
3) Masz **120** minut na wykonanie zadania

## Jak zacząć (ważne):
1. Kliknij: **Use this template → Create a new repository** (może być prywatne).
2. Zrób pierwszy commit/push — **od tego momentu startuje licznik czasu**.
3. Pracuj w swoim repo. Każdy push uruchamia testy i sprawdza limit czasu.
4. Gdy skończysz:
   - Dodaj nas jako collaboratorów (Settings → Collaborators) **albo** wyślij link do repo.
   - (Opcjonalnie) utwórz tag `submission`.

## Skład
- **nginx**: reverse proxy
- **app (Node.js + Express)**: endpointy `/`, `/health`, `/api/messages`
- **mysql**: baza z tabelą `messages` i seedem

## Jak uruchomić (Docker Compose)
```bash
docker compose up -d
curl -fsS http://localhost:8080/health
curl -fsS http://localhost:8080/
curl -fsS http://localhost:8080/api/messages
```

## Jak uruchomić (Kubernetes)
```bash
kubectl apply -f k8s/namespace.yaml
kubectl -n challenge apply -f k8s/mysql.yaml
kubectl -n challenge apply -f k8s/app.yaml
kubectl -n challenge apply -f k8s/ingress.yaml
kubectl -n challenge get pods,svc,ingress
```

## Zasady Challenge

- **Limit czasu: 2 godziny** liczone od momentu zrobienia pusha do GitHuba.
- Limit egzekwowany jest automatycznie przez GitHub Actions (`Limit Window`).
- Jeżeli spróbujesz oddać rozwiązanie po czasie — workflow się nie powiedzie.
- Nie wyłączaj ani nie modyfikuj workflow — traktowane będzie jako niezaliczenie.
- Po zakończeniu pracy zrób Pull Request **w swoim repo**.
- Wszystkie zmiany będą widoczne w historii PR w Twoim repo.


## Kryteria zaliczenia
- `GET /health` zwraca `OK` (200)
- `GET /` zwraca „Welcome to DevOps Challenge!”
- `GET /api/messages` zwraca wpisy z bazy (po seedzie lub twoich insertach)

## Co oceniamy
- Czytelność commitów i PR,
- Jakość diagnozy i logiki zmian,
- Działające środowisko uruchomieniowe (docker/k8s),
- Skrócenie czasu build/test (cache, optymalizacje),
- Dokumentację kroków.

### Tipy
- `docker compose logs -f`
- `docker compose exec app sh`
- `kubectl -n challenge logs DEPLOY/NAME -f`
- `kubectl -n challenge exec -it POD -- sh`
