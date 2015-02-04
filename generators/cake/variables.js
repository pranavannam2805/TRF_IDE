/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating cake for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.cake.variables');

goog.require('Blockly.cake');

Blockly.cake['define_get'] = function(block) {
  // Variable getter.
  var code = Blockly.cake.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['define_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var define = '#define';
  return define + ' ' + varName + ' ' + argument0 + '\n';
};

Blockly.cake['text'] = function(block) {
  // Text value.
  var code = Blockly.cake.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['variables_get'] = function(block) {
  // Variable getter.
  var code = Blockly.cake.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.cake['variables_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  return varType + ' ' + varName + ' = ' + argument0 + ';\n';
};

Blockly.cake['variables_pointer_get'] = function(block) {
  // Variable getter.
  var code = Blockly.cake.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['variables_pointer_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.cake.valueToCode(block, 'VAR',
    Blockly.cake.ORDER_ASSIGNMENT);
  return argument1 + ' = ' + argument0 + ';\n';
};

Blockly.cake['variables_pointer_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  var varIteration;
  if (block.getFieldValue('ITERATION') == '*' || block.getFieldValue('ITERATION') == '**' || block.getFieldValue('ITERATION') == '***')
    varIteration = block.getFieldValue('ITERATION');
  else {
    window.alert('please confirm asterisk. that must be among *, **, and  ***.');
    return 0;
  }
  return varType + varIteration + ' ' + varName + ' = ' + argument0 + ';\n';
};

Blockly.cake['variables_pointer_&'] = function(block) {
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE', Blockly.cake.ORDER_ASSIGNMENT);
  return ['&' + argument0, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['variables_pointer_*'] = function(block) {
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE', Blockly.cake.ORDER_ASSIGNMENT);
  return ['*' + argument0, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['variables_array_get'] = function(block) {
  var varName = Blockly.cake.variableDB_.getName(block.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  var length_1 = block.getFieldValue('LENGTH_1');
  var length_2 = block.getFieldValue('LENGTH_2');
  var length_3 = block.getFieldValue('LENGTH_3');

  length_1 = (length_1 == '' ? -1 :length_1 * 1);
  length_2 = (length_2 == '' ? -1 :length_2 * 1);
  length_3 = (length_3 == '' ? -1 :length_3 * 1);

  // get array list
  var arrList = Blockly.Blocks.getWantedBlockArray('a');

  // get index of array from array list
  var idxList = Blockly.Blocks.getIndexArray(arrList, varName);


    var code;
  if (isNaN(length_1) == true || isNaN(length_2) == true || isNaN(length_3) == true) {
    window.alert('Error, you have to enter the number in length');
  }
  else {
      var isAvbNum1, isAvbNum2, isAvbNum3;

      isAvbNum1 = Blockly.Blocks.checkArrayIndex(length_1, idxList[0]);
      isAvbNum2 = Blockly.Blocks.checkArrayIndex(length_2, idxList[1]);
      isAvbNum3 = Blockly.Blocks.checkArrayIndex(length_3, idxList[2]);

      // index over -> msg
      if ((isAvbNum1 == false && length_1 != -1) || (isAvbNum2 == false && length_2 != -1) || (isAvbNum3 == false && length_3 != -1)) {
          window.alert('인덱스 초과');
          block.initIdx(isAvbNum1, isAvbNum2, isAvbNum3);
      }

      else if (isAvbNum1 == true && isAvbNum2 == false && isAvbNum3 == false)
          code = varName + '[' + length_1 + ']';
      else if (isAvbNum1 == true && isAvbNum2 == true && isAvbNum3 == false)
          code = varName + '[' + length_1 + ']' + '[' + length_2 + ']';
      else if (isAvbNum1 == true && isAvbNum2 == true && isAvbNum3 == true)
          code = varName + '[' + length_1 + ']' + '[' + length_2 + ']' + '[' + length_3 + ']';
      else
          block.initIdx(isAvbNum1, isAvbNum2, isAvbNum3);
  }
    return [code, Blockly.cake.ORDER_ATOMIC];
};

Blockly.cake['variables_array_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);


  var length_1 = block.getFieldValue('LENGTH_1');
  var length_2 = block.getFieldValue('LENGTH_2');
  var length_3 = block.getFieldValue('LENGTH_3');

  // if no-input : regarded as -1 to distinguish with 0
  length_1 = (length_1 == '' ? -1 :length_1 * 1);
  length_2 = (length_2 == '' ? -1 :length_2 * 1);
  length_3 = (length_3 == '' ? -1 :length_3 * 1);


  // get array list
  var arrList = Blockly.Blocks.getWantedBlockArray('a');

  // get index of array from array list
  var idxList = Blockly.Blocks.getIndexArray(arrList, varName);

  var code;
  if (isNaN(length_1) == true || isNaN(length_2) == true || isNaN(length_3) == true) {
    window.alert('Error, you have to enter the number in length');
  }
  else {
      var isAvbNum1, isAvbNum2, isAvbNum3;

      isAvbNum1 = Blockly.Blocks.checkArrayIndex(length_1, idxList[0]);
      isAvbNum2 = Blockly.Blocks.checkArrayIndex(length_2, idxList[1]);
      isAvbNum3 = Blockly.Blocks.checkArrayIndex(length_3, idxList[2]);

      // index over -> msg
      if ((isAvbNum1 == false && length_1 != -1) || (isAvbNum2 == false && length_2 != -1) || (isAvbNum3 == false && length_3 != -1)) {
          window.alert('인덱스 초과');
          block.initIdx(isAvbNum1, isAvbNum2, isAvbNum3);
      }
      else if (isAvbNum1 == true && isAvbNum2 == false)
          code = varName + '[' + length_1 + ']' + ' = ' + argument0 + ';\n';
      else if (isAvbNum1 == true && isAvbNum2 == true && isAvbNum3 == false)
          code = varName + '[' + length_1 + ']' + '[' + length_2 + ']' + ' = ' + argument0 + ';\n';
      else if (isAvbNum1 == true && isAvbNum2 == true && isAvbNum3 == true)
          code = varName + '[' + length_1 + ']' + '[' + length_2 + ']' + '[' + length_3 + ']' + ' = ' + argument0 + ';\n';
      else
          block.initIdx(isAvbNum1, isAvbNum2, isAvbNum3);

  }
    return code;
};

Blockly.cake['variables_array_declare'] = function(block) {
  // Variable declare.
  var argument0 = Blockly.cake.valueToCode(block, 'VALUE',
    Blockly.cake.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.cake.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var varType = block.getFieldValue('TYPES');
  var length_1 = block.getFieldValue('LENGTH_1');
  var length_2 = block.getFieldValue('LENGTH_2');
  var length_3 = block.getFieldValue('LENGTH_3');
  length_1 = length_1 * 1;
  length_2 = length_2 * 1;
  length_3 = length_3 * 1;
  var code;

  // must: idx > 0 , no-input: regarded as 0
  if (isNaN(length_1) == true || isNaN(length_2) == true || isNaN(length_3) == true) {
    window.alert('Error, you have to enter the number in length');
  } else if (length_1 > 0 && length_2 == 0 && length_3 == 0)
      code = varType + ' ' + varName + '[' + length_1 + ']' + ' = {' + argument0 + '}' + ';\n';
  else if (length_1 > 0 && length_2 > 0 && length_3 == 0)
    code = varType + ' ' + varName + '[' + length_1 + ']' + '[' + length_2 + '] ' + ' = {' + argument0 + '}'  + ';\n';
  else if (length_1 > 0 && length_2 > 0 && length_3 > 0)
    code = varType + ' ' + varName +  '[' + length_1 + ']' + '[' + length_2 + ']' + '[' + length_3 + ']' + ' = {' + argument0 + '}'  + ';\n';
  else
    window.alert('Please confirm array index');
  return code;
};