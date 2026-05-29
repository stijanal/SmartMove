import { Router } from "express";
import { requireAuth } from "../../middlewares/auth";
import { mocked } from "../../utils/mock-response";

export const chatRouter = Router();

chatRouter.get("/conversations", requireAuth, (_req, res) => {
  res.json(
    mocked("Lista razgovora je vraćena iz demo sloja.", [
      {
        id: "conv-1",
        rideId: "ride-demo-1",
        participant: {
          fullName: "Marko Nikolić",
          rating: 4.9
        },
        lastMessage: "Jel važi i dalje dogovor za vožnju?",
        status: "confirmed"
      }
    ])
  );
});

chatRouter.get("/conversations/:id/messages", requireAuth, (req, res) => {
  res.json(
    mocked("Poruke razgovora su vraćene iz demo sloja.", {
      conversationId: req.params.id,
      messages: [
        {
          id: "msg-1",
          sender: "Marko Nikolić",
          text: "Jel važi i dalje dogovor za vožnju?",
          sentAt: "2026-05-28T16:00:00.000Z"
        },
        {
          id: "msg-2",
          sender: "Tijana Lukač",
          text: "Naravno, vidimo se na stanici!",
          sentAt: "2026-05-28T16:02:00.000Z"
        }
      ]
    })
  );
});

chatRouter.post("/conversations/:id/messages", requireAuth, (req, res) => {
  res.status(201).json(
    mocked("Slanje poruke je simulirano kroz stub endpoint.", {
      conversationId: req.params.id,
      sentMessage: req.body
    })
  );
});
