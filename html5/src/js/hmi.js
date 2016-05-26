/**
 * @file hmi.js
 * @author Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de>
 * @date 2016 May 25th
 *
 * @section LICENSE
 *
 * Copyright 2016, Oliver Merkel <Merkel(dot)Oliver(at)web(dot)de>
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
  this.ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
  this.caesar = new CipherCaesar();
  this.papers = {
    'frequenciescipheredtext': Raphael( 'frequenciescipheredtext', 10, 10 ),
    'frequenciesdecryptedtext': Raphael( 'frequenciesdecryptedtext', 10, 10 )
  };
}

Hmi.prototype.init = function () {
  var $window = $(window);
  $window.resize( this.resize.bind( this ) );
  this.reset();
  this.resize();
  $('#caesarcipheredtext').on('change', this.decrypt.bind(this));
  $('#decreasedecryptshift').on('click', this.decreaseDecryptShift.bind(this));
  $('#increasedecryptshift').on('click', this.increaseDecryptShift.bind(this));
  $('#decryptalphabetstandard').on('change', this.decrypt.bind(this));
  $('#decryptalphabetcustom').on('change', this.decrypt.bind(this));
  $('#decryptcustomalphabet').on('change', this.decrypt.bind(this));

  $('#plaintext').on('change', this.decrypt.bind(this));
  $('#decreaseencryptshift').on('click', this.decreaseEncryptShift.bind(this));
  $('#increaseencryptshift').on('click', this.increaseEncryptShift.bind(this));
  $('#encryptalphabetstandard').on('change', this.encrypt.bind(this));
  $('#encryptalphabetcustom').on('change', this.encrypt.bind(this));
  $('#encryptcustomalphabet').on('change', this.encrypt.bind(this));
  $('#reset').on('click', this.reset.bind(this));
};

Hmi.prototype.frequency = function ( id, task, src ) {
  var h = 50;
  var w = document.body.clientWidth - 66;
  var r = this.papers[ id ];
  r.setSize( w, h );
  r.clear();
  var rect = r.rect( 0, 0, w, h );
  rect.attr({ fill: 'white' });
  var alphabets = this.getAlphabets( task );
  var txt = $(src).val().toLowerCase();
  var count = [];
  var max = 0;
  for(var a=0; a<alphabets[0].length; ++a) {
    count[a] = 0;
    for(var b=0; b<txt.length; ++b) {
      count[a] += alphabets[0][a] == txt[b] ? 1 : 0;
      max = count[a] > max ? count[a] : max;
    }
  }
  for(var a=0; a<alphabets[0].length; ++a) {
    var topLeftX = w * a / alphabets[0].length;
    var topLeftY = h * (1.0 - (count[a] / max));
    var rectWidth = w / alphabets[0].length;
    var rectHeight = h - topLeftY;
    // console.log( alphabets[0][a] + ':' + /* rectWidth + ':' + topLeftX + ':' + */ (count[a] / max) );
    var b = r.rect( topLeftX, topLeftY, rectWidth, rectHeight );
    b.attr({ fill: 'gray' });
    var txtAttr = { font: '12px Helvetica, Arial', fill: 'brown' };
    var t = r.text( topLeftX + rectWidth / 2, h / 2, alphabets[0][a] ).attr( txtAttr );
  }
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
  var alphabets = this.getAlphabets( 'decrypt' );
  var shift = Number($('#decryptshift').html());
  var cipheredtext = $('#caesarcipheredtext').val();
  var plaintext = this.caesar.decrypt( alphabets, shift, cipheredtext );
  $('#decryptedtext').val(plaintext).css('height', 0).keyup();
  this.frequency('frequenciescipheredtext', 'decrypt', '#caesarcipheredtext');
  this.frequency('frequenciesdecryptedtext', 'decrypt', '#decryptedtext');
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

Hmi.prototype.getAlphabets = function ( t ) {
  var type = 'encrypt' == t ? t : 'decrypt';
  var choiceAlphabetValue = $('input[name=choice' + type + 'alphabet]:checked').val();
  var isStandardAlphabet = 'choice-' + type + 'alphabetstandard' == choiceAlphabetValue;
  var customAlphabet = $('#' + type + 'customalphabet').val();
  return isStandardAlphabet ? [
    this.ALPHABET.toLowerCase(), this.ALPHABET.toUpperCase()
  ] : [
    customAlphabet.toLowerCase(), customAlphabet.toUpperCase()
  ];
}

Hmi.prototype.encrypt = function () {
  var alphabets = this.getAlphabets( 'encrypt' );
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
  this.decrypt();
  this.encrypt();
};

$(function() { (new Hmi()).init(); });
