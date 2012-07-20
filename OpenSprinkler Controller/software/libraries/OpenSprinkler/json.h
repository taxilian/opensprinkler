// Simple lightweight JSON output formatter
// Author: Richard Bateman (taxilian)
// License: New BSD License
//
// Originally created for the OpenSprinkler library
//

#ifndef _JSON_h
#define _JSON_h

extern BufferFiller bfill;

#define k_JSONFirst 0x1

class JSON {
public:
    JSON() : m_state(k_JSONFirst) {}

    void beginDocument() {
        m_state = k_JSONFirst;
    }

    void startObject();
    void startObject(const prog_char* key);
    void endObject();

    void writeCStringValue(const prog_char* key, const char* value);
    void writeStringValue(const prog_char* key, const prog_char* value);
    void writeIntValue(const prog_char* key, const int val);

    void startArray();
    void startArray(const prog_char* key);
    void endArray();

    // Only allowed inside an array
    void writeInt(const int val);
    void writeString(const prog_char* val);

protected:
    void commaIfFirst();
    void outputKey(const prog_char* key);
    // Inline functions for speed and size
    void setFirstBit() {
        m_state |= k_JSONFirst;
    }
    void clearFirstBit() {
        m_state &= ~k_JSONFirst;
    }
    bool firstBitSet() {
        return m_state & k_JSONFirst;
    }

private:
    byte m_state;
};

#endif // _JSON_h
