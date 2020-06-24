jQuery.validator.addMethod("required2", function(value, element, param) {
    //fff
        value = value.trim();
        // check if dependency is met
        if ( !this.depend( param, element ) ) {
            return "dependency-mismatch";
        }
        if ( element.nodeName.toLowerCase() === "select" ) {
            // could be an array for select-multiple or a string, both are fine this way
            var val = $( element ).val();
            return val && val.length > 0;
        }
        if ( this.checkable( element ) ) {
            return this.getLength( value, element ) > 0;
        }
        return value.length > 0;
    });
    jQuery.validator.addMethod("phone", function(value, element, param) {
            return this.optional(element) || /^1[34578]\d{9}$/.test(value);
        }, $.validator.format("请输入正确的手机号"));
    jQuery.validator.addMethod("email", function(value, element, param) {
            return this.optional(element) || /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
        }, $.validator.format("请输入正确的邮箱"));
    
function validate() {
    return $('#contactForm').validate({
        rules: {
            name: "required",
            company: "required",
            phone: {
                required: true,
                phone: "#phone"
            },
            email: {
                required: true,
                email: "#email"
            },
            position: "required",
            city: 'required'
        },
        messages:{
            name:"请填写此项",
            company: "请填写此项",
            phone: {
                required: '请填写此项',
                phone: '请输入正确格式的手机号'
            },
            email: {
                required: '请填写此项',
                email: '请输入正确格式的邮箱'
            },
            position: '请填写此项',
            city: '请填写此项'
        }
    })
}

$("#submitBtn").click(function(){
    if (validate().form()) {
        Email.send({
            SecureToken : "C973D7AD-F097-4B95-91F4-40ABC5567812",
            To : 'them@website.com',
            From : "you@isp.com",
            Subject : "This is the subject",
            Body : "And this is the body"
        }).then(
          message => alert(message)
        );
       alert('提交成功，感谢您的使用。')
    }else{
        console.log('e')
    }
});
