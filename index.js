  // Отримати всі книги
      const books = document.querySelectorAll(".book");

      // Отримати модальне вікно та його елементи
      const modal = document.getElementById("modal");
      const modalContent = document.getElementById("modal-content");
      const actionButton = document.getElementById("action-button");
      const closeModalBtn = document.getElementById("close-modal");

      // Функція для відображення модального вікна з обраним контентом
      function showModal(bookTitle) {
        const isBookInLocalStorage = checkIfBookInLocalStorage(bookTitle);
        const actionButtonText = isBookInLocalStorage
          ? "Видалити з локального сховища"
          : "Додати до локального сховища";

        modalContent.textContent = `Ви вибрали книгу: ${bookTitle}`;
        actionButton.textContent = actionButtonText;
        modal.style.display = "block";
      }

      // Функція для закриття модального вікна
      function closeModal() {
        modal.style.display = "none";
      }

      // Функція для перевірки, чи книга вже є в локальному сховищі
      function checkIfBookInLocalStorage(bookTitle) {
        const localStorageData =
          JSON.parse(localStorage.getItem("books")) || {};
        return localStorageData.hasOwnProperty(bookTitle);
      }

      // Функція для додавання або видалення книги з локального сховища
      function toggleBookInLocalStorage(bookTitle) {
        const localStorageData =
          JSON.parse(localStorage.getItem("books")) || {};

        if (localStorageData.hasOwnProperty(bookTitle)) {
          // Книга вже є в локальному сховищі, отже видаляємо її
          delete localStorageData[bookTitle];
        } else {
          // Книга відсутня в локальному сховищі, отже додаємо її
          localStorageData[bookTitle] = true;
        }

        // Зберегти оновлений об'єкт у локальному сховищі
        localStorage.setItem("books", JSON.stringify(localStorageData));
      }

      // Додати обробник подій для кожної книги
      books.forEach((book) => {
        book.addEventListener("click", () => {
          const bookTitle = book.getAttribute("data-title");
          showModal(bookTitle);
        });
      });

      // Додати обробник подій для кнопок модального вікна
      actionButton.addEventListener("click", () => {
        const bookTitle = modalContent.textContent.replace(
          "Ви вибрали книгу: ",
          ""
        );
        toggleBookInLocalStorage(bookTitle);
        showModal(bookTitle); // Оновити вигляд модального вікна після зміни локального сховища
      });

      closeModalBtn.addEventListener("click", closeModal);