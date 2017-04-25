/**
 * Created by user on 2017/1/11.
 */
function checkForm() {
    <!--数据验证-->
    $("#registerFormPer").bootstrapValidator({
        message:'This value is not valid',
//            定义未通过验证的状态图标
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
//            字段验证
        fields:{
            per_name:{
                message:'用户名非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
//                        限制字符串长度
                    stringLength:{
                        min:2,
                        max:10,
                        message:'用户名长度必须位于3到10之间'
                    },
//                        基于正则表达是的验证
                    regexp:{
                        regexp:/^[\u2E80-\u9FFF]+$/,
                        message:'用户名必须由是汉字组成'
                    }
                }
            },
            //手机验证
            per_tel:{
                message:'手机号非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'手机号码不能为空'
                    },
                    stringlength:{
                        min:11,
                        max:11,
                        message:'请输入11位手机号码'
                    },
                    regexp:{
                        regexp:/^1[3|5|8|7]{1}[0-9]{9}$/,
                        message:'请输入正确的手机号码'
                    }
                }
            },
            per_bir:{
                message:'出生日期非法',
                validators:{
                    //                        非空
                    notEmpty:{
                        message:'出生日期不能为空'
                    }
                }
            },
            //邮箱验证
            per_email:{
                message:'邮箱非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'邮箱不能为空'
                    },
                    emailAddress:{
                        message:'请输入正确的邮箱地址'
                    }
                }
            },
        }
    })

    /*地址的验证*/
    $("#registerFormAdd").bootstrapValidator({
        message:'This value is not valid',
//            定义未通过验证的状态图标
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //            字段验证
        fields:{
            per_address_name:{
                message:'姓名非法',
                validators:{
                    notEmpty:{
                        message:'姓名不能为空'
                    },
                    //                        限制字符串长度
                    stringLength:{
                        min:1,
                        max:10,
                        message:'姓名长度必须位于1到10之间'
                    }
                }
            },
            per_address_tel:{
                message:'手机号非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'手机号码不能为空'
                    },
                    stringlength:{
                        min:11,
                        max:11,
                        message:'请输入11位手机号码'
                    },
                    regexp:{
                        regexp:/^1[3|5|8|7]{1}[0-9]{9}$/,
                        message:'请输入正确的手机号码'
                    }
                }
            },
            per_address_specific:{
                message:'地址非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'具体地址不能为空'
                    }
                }
            }
        }
    })

    /*修改密码的验证*/
    $("#registerFormPwd").bootstrapValidator({
        message:'This value is not valid',
//            定义未通过验证的状态图标
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
//            字段验证
        fields:{
            per_old_pwd:{
                message:'密码非法',
                validators:{
                    notEmpty:{
                        message:'原密码不能为空'
                    },
//                        限制字符串长度
                    stringLength:{
                        min:3,
                        max:20,
                        message:'密码长度必须位于3到20之间'
                    },
//                        基于正则表达是的验证
                    regexp:{
                        regexp:/^[a-zA-Z0-9_]+$/,
                        message:'密码由数字字母下划线组成'
                    }
                }
            },
            per_new_pwd:{
                message:'密码非法',
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
//                        限制字符串长度
                    stringLength:{
                        min:3,
                        max:20,
                        message:'密码长度必须位于3到20之间'
                    },
//                        基于正则表达是的验证
                    regexp:{
                        regexp:/^[a-zA-Z0-9_]+$/,
                        message:'密码由数字字母下划线组成'
                    }
                }
            },
            per_sure_pwd:{
                message:'密码非法',
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
//                        限制字符串长度
                    stringLength:{
                        min:3,
                        max:20,
                        message:'密码长度必须位于3到20之间'
                    },
                    identical: {//相同
                        field: 'per_new_pwd',
                        message: '两次密码不一致'
                    },
//                        基于正则表达是的验证
                    regexp:{
                        regexp:/^[a-zA-Z0-9_]+$/,
                        message:'密码由数字字母下划线组成'
                    }
                }
            }
        }
    })

    $("#shopPro-add").bootstrapValidator({
        message:'This value is not valid',
//            定义未通过验证的状态图标
        feedbackIcons: {/*输入框不同状态，显示图片的样式*/
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //            字段验证
        fields:{
            shopProName_name:{
                message:'姓名非法',
                validators:{
                    notEmpty:{
                        message:'姓名不能为空'
                    },
                    //                        限制字符串长度
                    stringLength:{
                        min:1,
                        max:10,
                        message:'姓名长度必须位于1到10之间'
                    }
                }
            },
            shopProPhone_name:{
                message:'手机号非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'手机号码不能为空'
                    },
                    stringlength:{
                        min:11,
                        max:11,
                        message:'请输入11位手机号码'
                    },
                    regexp:{
                        regexp:/^1[3|5|8|7]{1}[0-9]{9}$/,
                        message:'请输入正确的手机号码'
                    }
                }
            },
            per_address_specific:{
                message:'地址非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'具体地址不能为空'
                    }
                }
            },
            shopProAddress_info_name:{
                message:'邮编非法',
                validators:{
//                        非空
                    notEmpty:{
                        message:'具体地址不能为空'
                    }
                }
            }
        }
    })
}

$(function () {
    checkForm();
});
