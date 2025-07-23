const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

class WorkoutChatbotEngine {
  constructor() {
    this.data = fs.readFileSync(path.join(__dirname, "intents.json"), "utf-8");
    this.intents = JSON.parse(this.data);
    this.conversation_tracking = {
      intent: "fitness_goals",
      messages: {},
      turns: 0,
      fallbackcounter: 0,
      orderofintents: ["fitness_goals", "experience_level", "equipment", "frequency", "time_availability",
        "current_weight", "desired_weight", "height", "body_composition", "workout_timing", "intensity_preference",
        "social_preference", "cardio_type", "strength_focus", "recovery_style", "seasonal_activity",
        "stress_management", "progress_tracking", "limitations", "preferences"],
      indexofintent: 0
    };
  }

  getAnswer(message) {
    this.conversation_tracking.turns++;

    if (this.conversation_tracking.turns === 1) {
      return this.randomquestion("fitness_goals");
    }

    const normalized_message = message.toLowerCase().replace(/[^\w\s]/g, '').trim();
    const detected_intent = this.check_intent(normalized_message);

    const is_correct = (detected_intent == this.conversation_tracking.orderofintents[this.conversation_tracking.indexofintent]);

    if (is_correct) {
      if (detected_intent !== "fallback") {
        this.conversation_tracking.messages[detected_intent] = normalized_message;
      }
      return this.continue();
    } else {
      return this.fallback();
    }
  }

  continue() {
    this.conversation_tracking.indexofintent += 1;
    this.conversation_tracking.fallbackcounter = 0;
    if (this.conversation_tracking.indexofintent >= this.conversation_tracking.orderofintents.length - 1) {
      return this.finalresponse();
    }
    const next = this.conversation_tracking.orderofintents[this.conversation_tracking.indexofintent];
    return this.randomquestion(next);
  }

  fallback() {
    if (this.conversation_tracking.fallbackcounter >= 3) {
      this.conversation_tracking = {
        intent: "fitness_goals",
        messages: {},
        turns: 0,
        fallbackcounter: 0,
        orderofintents: ["fitness_goals", "experience_level", "equipment", "frequency", "time_availability",
          "current_weight", "desired_weight", "height", "body_composition", "workout_timing", "intensity_preference",
          "social_preference", "cardio_type", "strength_focus", "recovery_style", "seasonal_activity",
          "stress_management", "progress_tracking", "limitations", "preferences"],
        indexofintent: 0
      };
      return "Sorry, I don't understand. I will start over. " + this.randomquestion("fitness_goals");
    }
    this.conversation_tracking.fallbackcounter++;
    return this.randomquestion("fallback");
  }

  check_intent(normalized_message) {
    const words = normalized_message.split(/\s+/);
    let closest_intent = "fallback";
    let top_score = 0;
    const expectedIntent = this.conversation_tracking.orderofintents[this.conversation_tracking.indexofintent];

    for (const [name, data] of Object.entries(this.intents)) {
      if (name === "fallback") continue;

      let score = 0;
      if (data.keywords) {
        for (const keyword of data.keywords) {
          if (words.includes(keyword)) {
            score++;
          }

          for (const word of words) {
            if (word.includes(keyword) && word.length > keyword.length) {
              score += 0.5;
            }
          }
        }
      }

      if (name === expectedIntent && score > 0) {
        score += 0.1;
      }

      if (score > top_score) {
        top_score = score;
        closest_intent = name;
      }
    }

    if (top_score === 0) {
      return "fallback";
    }

    return closest_intent;
  }

  randomquestion(intent) {
    if (!this.intents[intent] || !this.intents[intent].responses) {
      return this.finalresponse();
    }

    const responses = this.intents[intent].responses;
    if (Math.random() > 0.5 && responses.length > 1) {
      return responses[1];
    }
    return responses[0];
  }

  finalresponse() {
    let plan = `Here's your personalized workout plan:\n\n`;

    if (this.conversation_tracking.messages["fitness_goals"].includes("muscle")){plan+= `
Day 1: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 2: Full Body Strength
- Lunges: 3 sets of 10 each leg
- Wall sits: 3 sets of 30 seconds
- Mountain climbers: 3 sets of 15

Day 3: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds


`
if (this.conversation_tracking.messages["frequency"].includes("5") || this.conversation_tracking.messages["frequency"].includes("five")) {
plan +=`
Day 4: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 5: Full Body Strength
- Lunges: 3 sets of 10 each leg
- Wall sits: 3 sets of 30 seconds
- Mountain climbers: 3 sets of 15
`
}

if (this.conversation_tracking.messages["frequency"].includes("7") || this.conversation_tracking.messages["frequency"].includes("seven")) {
plan +=`
Day 4: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 5: Full Body Strength
- Lunges: 3 sets of 10 each leg
- Wall sits: 3 sets of 30 seconds
- Mountain climbers: 3 sets of 15

Day 6: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 7: Full Body Strength
- Lunges: 3 sets of 10 each leg
- Wall sits: 3 sets of 30 seconds
- Mountain climbers: 3 sets of 15
`


}
}
else if (this.conversation_tracking.messages["fitness_goals"].includes("endurance") || this.conversation_tracking.messages["fitness_goals"].includes("weight")) { plan +=`
Day 1: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 2: Running
Run 2 KM + 0.5 KM each next week.

Day 3: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

`
if (this.conversation_tracking.messages["frequency"].includes("5") || this.conversation_tracking.messages["frequency"].includes("five")) {
plan +=`
Day 4: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 5: Running
Run 2 KM + 0.5 KM each next week.
`
}

if (this.conversation_tracking.messages["frequency"].includes("7") || this.conversation_tracking.messages["frequency"].includes("seven")) {
plan +=`
Day 4: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 5: Running
Run 2 KM + 0.5 KM each next week.

Day 6: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 7: Running
Run 2 KM + 0.5 KM each next week.
`


}
}
else {

    plan += `
  Day 1: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 2: Rest or light walking

Day 3: Full Body Strength
- Lunges: 3 sets of 10 each leg
- Wall sits: 3 sets of 30 seconds
- Mountain climbers: 3 sets of 15

`
if (this.conversation_tracking.messages["frequency"].includes("5") || this.conversation_tracking.messages["frequency"].includes("five")) {
plan +=`
Day 4: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 5: Rest or light walking
`
}

if (this.conversation_tracking.messages["frequency"].includes("7") || this.conversation_tracking.messages["frequency"].includes("seven")) {
plan +=`
Day 4: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 5: Rest or light walking

Day 6: Full Body Basics
- Bodyweight squats: 3 sets of 10-15
- Push-ups: 3 sets of 8-12
- Plank: 3 sets of 30 seconds

Day 7:Rest or light walking
`


}
};

    plan += `Tips:
- Start with lighter weights/easier variations
- Focus on proper form over speed
- Rest 48 hours between strength sessions
- Stay hydrated and listen to your body!

Would you like me to adjust anything in this plan?`;

    return plan;
  }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
const userChatbots = {};

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  userChatbots[socket.id] = new WorkoutChatbotEngine();

  const initialResponse = userChatbots[socket.id].getAnswer("start");
  socket.emit("bot-response", initialResponse);

  socket.on("user-message", (msg) => {
    try {
      const chatbot = userChatbots[socket.id];
      if (!chatbot) {
        socket.emit("bot-response", "Sorry, there was an error. Please refresh and try again.");
        return;
      }


      const response = chatbot.getAnswer(msg);
      socket.emit("bot-response", response);
    } catch (error) {
      console.error("Error processing message:", error);
      socket.emit("bot-response", "Sorry, I encountered an error. Please try again.");
    }
  });

  socket.on("new-session", () => {
    userChatbots[socket.id] = new WorkoutChatbotEngine();

    const initialResponse = userChatbots[socket.id].getAnswer("start");
    socket.emit("bot-response", initialResponse);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    delete userChatbots[socket.id];
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});