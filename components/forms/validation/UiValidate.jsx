import React from 'react'
import _ from 'lodash'
import ScriptLoader from '../../utils/mixins/ScriptLoader.jsx'
import {findDOMNode} from 'react-dom'



let UiValidate = React.createClass({

    mixins: [ScriptLoader],
    componentDidMount: function () {
      let me = this;
        this.loadScript('/vendor.ui.js').then(function(){

            let form = $(findDOMNode(this))
            let validateCommonOptions =  {
                rules: {},
                messages: {},
                errorElement: 'em',
                errorClass: 'invalid',
                highlight: function(element, errorClass, validClass) {

                    $(element).addClass(errorClass).removeClass(validClass);
                    $(element).parent().addClass('state-error').removeClass('state-success');
                },
                unhighlight: function(element, errorClass, validClass) {

                    $(element).removeClass(errorClass).addClass(validClass);
                    $(element).parent().removeClass('state-error').addClass('state-success');
                },

                errorPlacement : function(error, element) {
                    if (element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                }
            }
            //新增手机验证
            $.validator.addMethod("isMobile", function(value, element) {
              var length = value.length;
              var mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
              return this.optional(element) || (length == 11 && mobile.test(value));
            }, "请正确填写您的手机号码");

            //新增座机验证
            $.validator.addMethod("isTelephone", function(value, element) {
              var telephone = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
              return this.optional(element) || telephone.test(value);
            }, "请正确填写座机号码");

            form.find('[data-smart-validate-input], [smart-validate-input]').each(function () {
                var $input = $(this), fieldName = $input.attr('name');

                validateCommonOptions.rules[fieldName] = {};

                if ($input.data('required') != undefined) {
                    validateCommonOptions.rules[fieldName].required = true;
                }
                if ($input.data('email') != undefined) {
                    validateCommonOptions.rules[fieldName].email = true;
                }

                if ($input.data('maxlength') != undefined) {
                    validateCommonOptions.rules[fieldName].maxlength = $input.data('maxlength');
                }

                if ($input.data('minlength') != undefined) {
                    validateCommonOptions.rules[fieldName].minlength = $input.data('minlength');
                }

                if($input.data('message')){
                    validateCommonOptions.messages[fieldName] = $input.data('message');
                } else {
                    _.forEach($input.data(), function(value, key){
                        if(key.search(/message/)== 0){
                            if(!validateCommonOptions.messages[fieldName])
                                validateCommonOptions.messages[fieldName] = {};

                            var messageKey = key.toLowerCase().replace(/^message/,'')
                            validateCommonOptions.messages[fieldName][messageKey] = value;
                        }
                    });
                }
            });

            form.validate(_.extend(validateCommonOptions, this.props.options))
            if (typeof this.props.onDidMount == 'function') {
                this.props.onDidMount(form);
            }

        }.bind(this))
    },
    render: function () {
        return (
            this.props.children
        )
    }
});

export default UiValidate
