
/**
 * @file hmi.js
 * @author Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de
 * @date 2015 July 31
 *
 * @section LICENSE
 *
 * Copyright 2015, Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de
 * All rights reserved.
 *
 * Released under the MIT license.
 *
 * @section DESCRIPTION
 *
 * @brief Class Hmi.
 * 
 * Class representing the view or Hmi of the Caesar Cipher / Shift Cipher encryption technique based tool.
 *
 */
function Hmi() {
  // this.FILEBACKGROUND = 'img/board.jpg';
  this.ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  this.caesar = new CipherCaesar();
}

Hmi.prototype.init = function () {
  var $window = $(window);
  $window.resize( this.resize.bind( this ) );
  this.reset();
  this.resize();
  $('#decreasedecryptshift').on('click', this.decreaseDecryptShift.bind(this));
  $('#increasedecryptshift').on('click', this.increaseDecryptShift.bind(this));
  $('#decryptalphabetstandard').on('change', this.decrypt.bind(this));
  $('#decryptalphabetcustom').on('change', this.decrypt.bind(this));
  $('#decreaseencryptshift').on('click', this.decreaseEncryptShift.bind(this));
  $('#increaseencryptshift').on('click', this.increaseEncryptShift.bind(this));
  $('#encryptalphabetstandard').on('change', this.encrypt.bind(this));
  $('#encryptalphabetcustom').on('change', this.encrypt.bind(this));
  $('#reset').on('click', this.reset.bind(this));
};

Hmi.prototype.reset = function () {
  $('#caesarcipheredtext').val('Oittqi mab wuvqa lqdqai qv xizbma bzma, ' +
    'ycizcu cviu qvkwtcvb Jmtoim, itqiu Iycqbivq, bmzbqiu, ycq qxawzcu ' +
    'tqvoci Kmtbim, vwabzi Oittq ixxmttivbcz.').css('height', 0).keyup();
  $('#plaintext').val('This is the secret message to be encrypted.').css('height', 0).keyup();
  $('#decryptshift').html('0');
  $('#decryptcustomalphabet').val(this.ALPHABET); 
  $('#encryptshift').html('0');
  $('#encryptcustomalphabet').val(this.ALPHABET);  
  this.decrypt();
  this.encrypt();
};

Hmi.prototype.decreaseDecryptShift = function () {
  var shift = Number($('#decryptshift').html()) - 1;
  $('#decryptshift').html('' + shift);
  this.decrypt();
};

Hmi.prototype.increaseDecryptShift = function () {
  var shift = Number($('#decryptshift').html()) + 1;
  $('#decryptshift').html('' + shift);
  this.decrypt();
};

Hmi.prototype.decrypt = function () {
  var choiceAlphabetValue = $('input[name=choicedecryptalphabet]:checked').val();
  var isStandardAlphabet = 'choice-decryptalphabetstandard' == choiceAlphabetValue;
  var customAlphabet = $('#decryptcustomalphabet').val();
  var alphabets = isStandardAlphabet ? [
    this.ALPHABET.toLowerCase(),
    this.ALPHABET.toUpperCase()
  ] : [
    customAlphabet.toLowerCase(),
    customAlphabet.toUpperCase()
  ];
  var shift = Number($('#decryptshift').html());
  var cipheredtext = $('#caesarcipheredtext').val();
  var plaintext = this.caesar.decrypt( alphabets, shift, cipheredtext );
  $('#decryptedtext').val(plaintext).css('height', 0).keyup();
};

Hmi.prototype.decreaseEncryptShift = function () {
  var shift = Number($('#encryptshift').html()) - 1;
  $('#encryptshift').html('' + shift);
  this.encrypt();
};

Hmi.prototype.increaseEncryptShift = function () {
  var shift = Number($('#encryptshift').html()) + 1;
  $('#encryptshift').html('' + shift);
  this.encrypt();
};

Hmi.prototype.encrypt = function () {
  var choiceAlphabetValue = $('input[name=choiceencryptalphabet]:checked').val();
  var isStandardAlphabet = 'choice-encryptalphabetstandard' == choiceAlphabetValue;
  var customAlphabet = $('#encryptcustomalphabet').val();
  var alphabets = isStandardAlphabet ? [
    this.ALPHABET.toLowerCase(),
    this.ALPHABET.toUpperCase()
  ] : [
    customAlphabet.toLowerCase(),
    customAlphabet.toUpperCase()
  ];
  var shift = Number($('#encryptshift').html());
  var plaintext = $('#plaintext').val();
  var encryptedtext = this.caesar.encrypt( alphabets, shift, plaintext );
  $('#encryptedtext').val(encryptedtext).css('height', 0).keyup();
};

Hmi.prototype.resize = function () {
  var offsetHeight = 64,
    availableWidth = window.innerWidth,
    availableHeight = window.innerHeight - offsetHeight;
  var size = Math.min(availableWidth, availableHeight);

  $('#game-page').css({
    'background-size': 'auto ' + (size/6) + 'px',
  });
  var minSize = 32;
  size = 0.06 * availableWidth < minSize ? minSize : 0.06 * availableWidth;
  $('#customMenu').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#customBackAbout').css({
    'width': size+'px', 'height': size+'px',
    'background-size': size+'px ' + size+'px',
  });
  $('#main').css({ 'padding-top': size+'px', });
};

$(function() { (new Hmi()).init(); });
