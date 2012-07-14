// Simple lightweight JSON output formatter
// Author: Richard Bateman (taxilian)
// License: New BSD License
//
// Originally created for the OpenSprinkler library
//

#if ARDUINO >= 100
#include <Arduino.h> // Arduino 1.0
#else
#include <WProgram.h> // Arduino 0022
#endif

#include <OpenSprinkler.h>

#include <json.h>

extern BufferFiller bfill;

prog_char json_openbrace[] PROGMEM = "{";
prog_char json_closebrace[] PROGMEM = "}";
prog_char json_openbracket[] PROGMEM = "[";
prog_char json_closebracket[] PROGMEM = "]";
prog_char json_comma[] PROGMEM = ",";
prog_char json_quotedStr[] PROGMEM = "\"$S\"";
prog_char json_quotedPStr[] PROGMEM = "\"$F\"";
prog_char json_intVal[] PROGMEM = "$D";

void JSON::startObject() {
    commaIfFirst();
    bfill.emit_p(json_openbrace);
    setFirstBit(); // First item needs no comma
}

void JSON::startObject(const prog_char* key) {
    outputKey(key);
    setFirstBit();
    startObject();
}

void JSON::endObject() {
    bfill.emit_p(json_closebrace);
    clearFirstBit(); // next item is not first
}

void JSON::outputKey(const prog_char* key) {
    commaIfFirst();
    bfill.emit_p(PSTR("\"$F\":"), key);
}

void JSON::commaIfFirst() {
    if (!firstBitSet()) {
        bfill.emit_p(PSTR(","));
    } else {
        clearFirstBit(); // Clear the JSONFirst bit
    }
}

// Document output methods
void JSON::writeStringValue(const prog_char* key, const prog_char* value) {
    outputKey(key);
    bfill.emit_p(json_quotedPStr, value);
}

void JSON::writeIntValue(const prog_char* key, const int val) {
    outputKey(key);
    bfill.emit_p(json_intVal, val);
}


// Array output methods
void JSON::startArray() {
    commaIfFirst();
    bfill.emit_p(json_openbracket);
    setFirstBit();
}
void JSON::startArray(const prog_char* key) {
    outputKey(key);
    setFirstBit();
    startArray();
}
void JSON::endArray() {
    bfill.emit_p(json_closebracket);
    clearFirstBit(); // next item is not first
}

void JSON::writeInt(const int val) {
    commaIfFirst();
    bfill.emit_p(json_intVal, val);
}
void JSON::writeString(const prog_char* val) {
    commaIfFirst();
    bfill.emit_p(json_quotedPStr, val);
}
