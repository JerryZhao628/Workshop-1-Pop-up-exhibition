
// Physical Computing Project – Touch Sensor for p5.js Control
// Ruijie Zhao

// This Arduino code turns a simple metal-to-metal contact
// (ring touching a metal plate) into a digital touch sensor.
// When the ring touches the metal plate, the circuit closes,
// and Arduino sends "TOUCH" to p5.js. When released,
// Arduino sends "RELEASE".


int touchPin = 2;   // D2 is used as the digital input pin

void setup() {
  Serial.begin(9600);     // Start serial communication with p5.js
  pinMode(touchPin, INPUT_PULLUP);
  // INPUT_PULLUP keeps the pin HIGH until the ring touches GND.
  // TOUCH = pin goes LOW when the ring connects to the metal plate.
}

void loop() {

  int sensorValue = digitalRead(touchPin);  

  if (sensorValue == LOW) {
    // Ring is touching the metal plate → circuit closed
    Serial.println("TOUCH");
  } else {
    // Ring is not touching → circuit open
    Serial.println("RELEASE");
  }

  delay(20);  
  // Small delay to prevent serial spamming and stabilize readings
}

