=======================
=== !!!IMPORTANT!!! ===
=======================

*DO NOT* download .hex files directly from GitHub page by using 'Save File As...' or 'Save Link As...'. Instead, download the entire package as a zip file, or alternatively download individual files using the 'Raw' link.

OpenSprinkler v1.2u has on-board USBtiny programmer. Basic instructions are as follows:

- Plug in a USB cable to the USB connector.

- To flash, use  command:
: avrdude -c usbtiny -p m328p -F -U flash:w:xxxxx.hex

If you are using Windows, you need to install driver for USBtiny programmer. Instructions can be found here:
http://rayshobby.net/?page_id=732#v12

