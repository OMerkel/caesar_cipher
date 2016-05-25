
/**
 * @file ciphercaesar.js
 * @author Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de
 * @date 2016 May 25th
 *
 * @section LICENSE
 *
 * Copyright 2016, Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de
 * All rights reserved.
 *
 * Released under the MIT license.
 *
 * @section DESCRIPTION
 *
 * @brief Class Caesar Cipher.
 * 
 * Class for usage of Caesar Cipher encryption/decryption.
 *
 */
function CipherCaesar() {}

/** 
 * @brief Caesar Cipher Decryption
 *
 * @param alphabets Array of strings representing alphabets to apply the shift on.
 * @param shift Amount of digits to shift the alphabet. Negative shift values allowed.
 * @param cipheredtext The encoded cryptic text.
 * 
 * @return Decrypted plain text as string value.
 */
CipherCaesar.prototype.decrypt = function ( alphabets, shift, cipheredtext ) {
  var result = '';
  for(var i=0; i<cipheredtext.length; ++i) {
    var c = cipheredtext.charAt(i); 
    var found = null;
    for(var alphabetIndex=0;
      null === found && alphabetIndex<alphabets.length; ++alphabetIndex) {
      var alphabet = alphabets[alphabetIndex];
      var position = alphabet.indexOf(c);
      found = -1 == position ? null : { position: position, alphabet: alphabet };
    }
    while( 0 > shift && null !== found ) {
      shift += found.alphabet.length;
    }
    result += null === found ? c :
      found.alphabet.charAt( (found.position + shift) % found.alphabet.length );
  };
  return result;
};

/**
 * @brief Caesar Cipher Encryption
 *
 * @param alphabets Array of strings representing alphabets to apply the shift on.
 * @param shift Amount of digits to shift the alphabet. Negative shift values allowed.
 * @param plaintext The plain text to encrypt.
 * 
 * @return Cryptic encoded text as string value.
 */
CipherCaesar.prototype.encrypt = function ( alphabets, shift, plaintext ) {
  return this.decrypt( alphabets, shift, plaintext );
};
