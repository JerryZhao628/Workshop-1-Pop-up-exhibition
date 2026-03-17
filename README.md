# Workshop-1-Pop-up-exhibition
## The Way Back to Her

Author: Ruijie Zhao  
Student ID: 33841481  
Date: March 2026  

---

## Project Description

《The Way Back to Her》 is an interactive photo restoration artwork that tells the long-distance love story of my grandparents.

The project begins with an old damaged photograph of my grandparents. As the interaction progresses, the image gradually restores itself, symbolizing memory, distance, and reunion.

The narrative follows three journeys between cities connected to my family history:

- Germany → Jinan  
- Beijing → Jinan  
- Sichuan → Jinan  

Each route represents a stage of emotional and geographical separation before reunion. As these journeys progress, the photograph slowly “heals,” reflecting the emotional weight of distance and time.

The final moment reveals a glowing heart at Jinan, symbolizing reunion and affection.

---

## Interaction

The work uses a handmade conductive ring connected to an Arduino device.

When the participant touches the ring to a metal plate:

- The system detects the connection
- A journey animation begins
- The photograph gradually restores

When the ring is lifted, the animation slowly reverses.

This gesture acts as a metaphor for reconnecting across distance.

---

## Technologies Used

- p5.js – visual animation and image restoration  
- Arduino Mega 2560 – physical input  
- Web Serial API– communication between Arduino and browser  
- Physical computing components
  - conductive metal ring
  - metal plate sensor
  - 3D-printed box enclosure

---

## How to Run the Project

1. Upload the Arduino code `The_way_back_to_her.ino` to the Arduino board.
2. Connect the Arduino to the computer via USB.
3. Open `index.html` in a browser.
4. Click Connect Serial.
5. Touch the conductive ring to the metal plate to start the interaction.

---

## Files

- `index.html` – main webpage  
- `sketch.js` – p5.js visualization code  
- `style.css` – webpage styling  
- `old.jpg` – damaged original photograph  
- `new.jpg` – restored photograph  
- `The_way_back_to_her.ino` – Arduino interaction code  
- `The_Way_Back_To_Her_Project.pdf` – project documentation  

---

## Design Decisions

- The first journey progresses slower to emphasize emotional weight.
- Each completed route increases the restoration intensity.
- The animation of routes and image restoration are synchronized to reinforce the narrative.

---

## Acknowledgements

Inspired by family archives and personal memory.

---

## Video

Project documentation video:  
https://vimeo.com/1144852832
