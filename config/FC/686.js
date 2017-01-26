UIProvider = {
    "curId": "418", "curNom": "LAK",
    "cellular": "true",
    "round_math":"~1",
    "grpId": "100001",
    "id": "686",
    "logo": "686.gif",
    "receiptName": "",
    "sName": "LAO Telecom",
    "small_logo": "",
    "tag": "visible",
    "cellular": "4",
    "minSum":5000,
    "maxSum":1000000,
    "__objects": [
        {
            "__type": "constParams"
        },
        {
            "__type": "pages",
            "__objects": [
                {
                    "pageId": "30605",
                    "title": "",
                    "useOnline": "",
                    "__objects": [
                        {
                            "__type": "controls",
                            "__objects": [
                                {
                                    "header": "Please type in the phone number, number should start only from 020 or 030",
                                    "footer": "Please check the phone number",
                                    "mask": "<!^\\d+${3}><!^\\d+${7,8}>",
                                    "name": "account",
                                    "nobr": "false",
                                    "regexp": "^[0]{1}\\d{9,10}$",
                                    "strip": "True",
                                    "type": "text_input"
                                },
                                {
                                    "layout": "DG",
                                    "type": "keyboard"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}