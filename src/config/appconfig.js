
var lexiconRoles={
  "driver"  :{"ru":"водитель","en":"driver"},
  "cook"    :{"ru":"повар","en":"cook"},
  "waiter"  :{"ru":"официант","en":"waiter"}
}

var lexiconSorts={
  "id"       :{"ru":"отсутствует","en":"id"},
  "name"     :{"ru":"по имени","en":"name"},
  "birthday" :{"ru":"по дате рождения","en":"birthday"}
}


var techPages={
  "deletePage" :   {
                    "title":"Данные сотрудника удалены",
                    "content":"Данные сотрудника удалены! Список сотрудников был изменен."
  },
  "addPage" :      {
                    "title":"Новый сотрудник добавлен",
                    "content":"Новый сотрудник добавлен! Список сотрудников был изменен."
  },
  "editPage" :     {
                    "title":"Данные сотрудника изменены",
                    "content":"Данные сотрудника изменены! Список сотрудников был изменен."
  },
  "notFoundPage" : {
                    "title":"Ресурс не найден",
                    "content":"Внимание, такого адреса не существует! Проверте правильность внесенных  данных. Для продолжения нажмите \"К списку сотрудников\"."
  },
  "deleteBufer" :  {
                    "title":"Вы собираетесь удалить запись сотрудника",
                    "content":"Внимание, данные сотрудника будут удалены безвозвратно! Для подтвержения удаления нажмите \"Продолжить\", для возврата в режим редактирования данных нажмите \"Назад\"."
  },
  "saveBufer" :    {
                    "title":"Вы собираетесь сохранить данные сотрудника",
                    "content":"Внимание, данные сотрудника будут изменены! Для внесения изменений нажмите \"Продолжить\", для возврата в режим редактирования данных нажмите \"Назад\"."
  },

}


export  {lexiconRoles,lexiconSorts,techPages};
