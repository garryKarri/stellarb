describe('Constructor page', () => {
  beforeEach(() => {
    // Перехватываем запрос на правильный эндпоинт и возвращаем моковые данные из fixtures
    cy.intercept(
      'GET',
      'https://norma.nomoreparties.space/api/ingredients',
      (req) => {
        req.reply((res) => {
          res.send({ fixture: 'ingredients.json' });
        });
      }
    ).as('getIngredients');
  });

  it('должен отображать моковые данные на странице', function () {
    // Переходим на страницу конструктора
    cy.visit('http://localhost:4000');

    // Ждем завершения запроса
    cy.wait('@getIngredients').its('response.statusCode').should('eq', 200);

    // Ждем загрузки страницы
    cy.wait(2000); // Увеличиваем время ожидания

    // Выводим HTML содержимое страницы для отладки
    cy.get('body').then(($body) => {
      cy.log($body.html());
    });

    // Проверяем, что элементы с моковыми данными отображаются на странице
    cy.fixture('ingredients.json').then((ingredients) => {
      // Выводим данные в лог для проверки
      cy.log(JSON.stringify(ingredients.data));

      // Добавляем проверку на тип данных
      expect(ingredients.data).to.be.an('array');

      // Проверяем каждый элемент массива
      ingredients.data.forEach((ingredient) => {
        cy.contains(ingredient.name, { timeout: 10000 }).should('be.visible');
      });
    });
  });
});
