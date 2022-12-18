/**
 * @file mofron-comp-chgpass/index.js
 * @brief select element component for mofron
 * @license MIT
 */
const HrzCenter  = require("mofron-layout-hrzcenter");
const loMargin   = require("mofron-layout-margin");
const ErrMessage = require("mofron-comp-errmsg");
const Input      = require("mofron-comp-input");
const Button     = require("mofron-comp-button");
const ConfArg    = mofron.class.ConfArg;
const comutl     = mofron.util.common;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short 
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("chgpass");
            
	    /* init config */
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    initDomConts () {
        try {
            super.initDomConts();
            
            this.layout([
                new HrzCenter(70),
		new loMargin('top','0.2rem')
	    ]);
            
            this.currentPasswd().config({
	        label: 'Current Password:',
		size:  new ConfArg('99%','0.35rem'),
		type:  'password'
            });
            this.newPasswd().config({
	        label: 'New Password:',
		size:  new ConfArg('99%','0.35rem'),
		type:  'password'
            });
            this.retypePasswd().config({
	        label: 'Enter New Password Again:',
		size:  new ConfArg('99%','0.35rem'),
		type:  'password'
            });
            this.changeButton().config({
                text:   'Change Password',
		height: '0.3rem'
            });
            
            this.child([
                this.errorMessage(),
                this.currentPasswd(),
                this.newPasswd(),
                this.retypePasswd(),
                this.changeButton()
	    ]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    errorMessage (prm,cnf) {
        try {
	    if ('string' === typeof prm) {
                this.errorMessage().text(prm);
                this.errorMessage().visible(true);
                return;
            }
            if (undefined !== cnf) {
                (undefined !== prm) ? prm.config(cnf) : this.errorMessage().config(cnf);
            }
            return this.innerComp('errorMessage', prm, ErrMessage);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    currentPasswd (prm,cnf) {
        try {
            if (undefined !== cnf) {
                (undefined !== prm) ? prm.config(cnf) : this.currentPasswd().config(cnf);
            }
            return this.innerComp('currentPasswd', prm, Input);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    newPasswd (prm,cnf) {
        try {
	    if (undefined !== cnf) {
                (undefined !== prm) ? prm.config(cnf) : this.newPasswd().config(cnf);
            }
            return this.innerComp('newPasswd', prm, Input);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    retypePasswd (prm,cnf) {
        try {
            if (undefined !== cnf) {
                (undefined !== prm) ? prm.config(cnf) : this.retypePasswd().config(cnf);
            }
            return this.innerComp('retypePasswd', prm, Input);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    changeButton (prm,cnf) {
        try {
            if (undefined !== cnf) {
                (undefined !== prm) ? prm.config(cnf) : this.changeButton().config(cnf);
            }
            return this.innerComp('changeButton', prm, Button);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    changeEvent (fnc,prm) {
        try {
            let set_fnc = (p1,p2,p3) => {
                try {
                    let err_flg = false;
		    /* check current password value */
		    if (null === p3.currentPasswd().value()) {
		        p3.errorMessage().text("enter the current password");
			p3.errorMessage().visible(true);
                        err_flg = true;
                    /* check new password value */
		    } else if ((null === p3.newPasswd().value()) || (null === p3.retypePasswd().value())) {
		        p3.errorMessage().text("enter the new password");
			p3.errorMessage().visible(true);
			err_flg = true;
		    }
                    /* chack match */
		    if (p3.newPasswd().value() !== p3.retypePasswd().value()) {
                        p3.errorMessage().text("the password doesn't match the retype password.");
                        p3.errorMessage().visible(true);
			err_flg = true;
		    }
                    
		    if (false === err_flg) {
		        p3.errorMessage().visible(false);
                    }
		    let evt_prm = {
                        'new_password':     p3.newPasswd().value(),
			'current_password': p3.currentPasswd().value(),
			'is_error':         err_flg
		    };
		    fnc(this, evt_prm, prm);
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
	    }
            return this.changeButton().clickEvent(set_fnc,this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
