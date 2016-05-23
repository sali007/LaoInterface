UIProvider = {
    "curId": "418", "curNom": "LAK",
    "cellular": "true",
    "round_math":"~1",
    "grpId": "100001",
    "id": "690",
    "logo": "690.gif",
    "receiptName": "",
    "sName": "Unitel",
    "small_logo": "",
    "tag": "visible",
    "cellular": "4",
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
                                    "header": "????????????????????????????",
                                    "footer": "Attention the number consist of 10 digits!",
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