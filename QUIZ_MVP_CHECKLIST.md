# Quiz MVP Handoff Checklist

## Current Status
- Project phase: Planning + scaffold for quiz MVP.
- Completed work: Step 1 and Step 2 are done.
- Build status: `npm run build` passes after latest changes.
- Feature route namespace: quiz routes are intentionally isolated under `/quiz/*`.

## Locked Product Decisions
- [x] Max players per room: 50
- [x] Progression: Auto-advance
- [x] Scoring: Correctness first, speed second
- [x] Auth now: Anonymous
- [x] Auth later: Google Sign-In
- [x] Quiz source in v1: Static data

## Implementation Plan (Track Here)
- [x] 1. Create bare page shell (implemented under `/quiz/host`, `/quiz/play`, `/quiz/room/[code]`).
- [x] 2. Add static placeholder quiz data (5 questions, 4 choices each, 15s default timer).
- [ ] 3. Define shared event types/contracts in one file.
- [ ] 4. Stand up PartyKit room with in-memory state only.
- [ ] 5. Implement join flow (host + player) with max 50.
- [ ] 6. Implement minimal phase machine (`lobby -> question_live -> question_result -> final_results`) with auto-advance.
- [ ] 7. Implement answer submission rules (single submit, deadline, duplicate/late handling).
- [ ] 8. Implement scoring (`800 + speed bonus up to 200`, wrong/timeout `0`).
- [ ] 9. Broadcast real-time updates (`room_state`, phase events, leaderboard updates).
- [ ] 10. Bind host/player UI placeholders to runtime data.
- [ ] 11. Add reconnect baseline (`sessionToken`, `playerSessionId` restore).
- [ ] 12. Persist match summary to D1 (first pass).
- [ ] 13. Add guardrails (validation, basic rate limits, standard error codes).
- [ ] 14. Run end-to-end local flow test (1 host + 2 players).

## Files Added/Changed So Far
- `src/pages/game.astro` (Game Center card points to `/quiz/play`)
- `src/pages/quiz/host.astro`
- `src/pages/quiz/play.astro` (loads static quiz metadata)
- `src/pages/quiz/room/[code].astro` (`prerender = false`)
- `src/data/quiz/static-quiz-v1.json`

## Next Agent: Start Here
- Immediate next task: Step 3 (`shared event types/contracts`).
- Suggested file path: `src/lib/quiz/protocol.ts`.
- Minimum contents:
- Define event envelope (`type`, `v`, `roomCode`, `actionId`, `sentAt`, `payload`).
- Define client->server event types: `join_room`, `start_game`, `submit_answer`, `heartbeat`, `end_game`.
- Define server->client event types: `join_accepted`, `room_state`, `player_joined`, `player_left`, `question_started`, `answer_ack`, `question_closed`, `score_update`, `game_over`, `error`.
- Export runtime-safe validators or narrow type guards if practical.

## Definition of Done For Step 3
- One shared protocol file exists and is imported by at least one quiz page/module.
- Event names match the agreed MVP contract.
- Basic payload shapes are typed (no `any` for core events).
- Build still passes.

## Quick Resume Commands
- `npm run build`
- `rg --files src/pages/quiz src/data/quiz`
- `rg -n "quiz|room_state|join_room" src`

## Notes
- Keep new quiz work under `src/pages/quiz` and quiz-related modules under a quiz-specific folder to preserve separation from legacy game pages.
- Do not reintroduce root-level `/host` or `/play` routes.
