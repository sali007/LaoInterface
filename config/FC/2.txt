
UIProvider ={"curId":"643","curNom":"RUB",
  "cellular": "true",
  "grpId": "100001",
  "id": "695",
  "logo": "695.gif",
  "receiptName": "",
  "sName": "Beeline",
  "small_logo": "",
  "tag": "visible",
  "minSum":"3000",
  "maxSum":"1000000",
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
                  "header": "Введите Ваш номер",
                  "footer": "Внимание! Номер телефона вводится без <8>, в формате: (ХХХ) ХХХ-ХХ-ХХ",
                  "mask": "8(<!^\\d+${3}>)<!^\\d+${7}>",
                  "name": "account",
                  "nobr": "false",
                  "regexp": "^\\d{10}$",
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