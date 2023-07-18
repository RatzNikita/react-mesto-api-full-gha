const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

module.exports.handleException = (err, req, res) => {
  if (err.name === 'PageNotFound') {
    res.status(404).send({ message: 'Страница с указанным адресом не найдена' });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST).send({ message: 'Введённые данные некорректны' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(BAD_REQUEST).send({ message: 'Передан некорректный идентификатор' });
    return;
  }
  if (err.name === 'NotFound') {
    if (req.baseUrl === '/users') {
      res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
    } else if (req.baseUrl === '/cards') {
      res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
    }
    return;
  }
  if (err.code === 11000) {
    res.status(CONFLICT).send({ message: 'Указанная почта уже используется' });
    return;
  }
  if (err.name === 'InvalidToken') {
    res.status(UNAUTHORIZED).send({ message: 'Вы не авторизованы' });
    return;
  }
  if (err.message === 'Неправильные почта или пароль') {
    res.status(UNAUTHORIZED).send({ message: err.message });
    return;
  }
  if (err.name === 'NotPermissions') {
    res.status(FORBIDDEN).send({ message: 'Вы не можете удалить чужую карточку' });
    return;
  }
  res.status(INTERNAL_ERROR).send({ message: 'Внутренняя ошибка сервера' });
};

module.exports.error = { BAD_REQUEST, NOT_FOUND, INTERNAL_ERROR };
