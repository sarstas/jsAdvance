Vue.component('error-data', {
    data() {
        return {
            errorMsg: 'Не удалось выполнить запрос к серверу'
        }
    },
     template: `
        <div class="error">
            <div class="error-title">
                <h3 class="error-data">{{ errorMsg }}</h3>
            </div>
        </div>
     `
});