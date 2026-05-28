const app = {
    mockLocations: [
        "Kragujevac", "Beograd", "Novi Sad", "Niš", "Kraljevo", 
        "Trstenik", "Vrnjačka Banja", "Čačak", "Aerodrom Beograd"
    ],
    selectedHour: "12",
    selectedMinute: "00",
    requestedSeats: 1,
    currentUser: null,

        users: [
        {
            email: "stijanal@gmail.com",
            password: "Trava123"
        }
    ],

    init: function() {
        this.bindEvents();
        this.buildCalendar('calendar-days', 'inp-date', 'custom-calendar');
        this.buildCalendar('pub-calendar-days', 'pub-date', 'pub-calendar');
        this.buildTimePicker();
        this.initProfileUpload();
    },

    bindEvents: function() {
        // Auto-complete osluškivači
        document.getElementById('inp-from').addEventListener('input', (e) => this.handleAutocomplete(e.target.value, 'suggestions-from', 'inp-from'));
        document.getElementById('inp-to').addEventListener('input', (e) => this.handleAutocomplete(e.target.value, 'suggestions-to', 'inp-to'));

        document.getElementById('inp-date').addEventListener('click', () => document.getElementById('custom-calendar').classList.toggle('hidden'));
        document.getElementById('pub-date').addEventListener('click', () => document.getElementById('pub-calendar').classList.toggle('hidden'));

        // Praćenje broja unetih sedišta radi kasnijeg filtriranja zauzetih vožnji
        document.getElementById('inp-seats').addEventListener('input', (e) => {
            this.limitSeats(e);
            this.requestedSeats = parseInt(e.target.value) || 1;
        });
        // Plus dugme u četu otvara akcije
        document.getElementById('btn-chat-plus').addEventListener('click', () => {
            document.getElementById('chat-plus-menu').classList.toggle('hidden');
        });
        document.getElementById('pub-time').addEventListener('click', () => {
            document.getElementById('custom-time-picker').classList.toggle('hidden');
        });
        document.getElementById('btn-confirm-time').addEventListener('click', () => {
            document.getElementById('pub-time').value = `${this.selectedHour}:${this.selectedMinute}h`;
            document.getElementById('custom-time-picker').classList.add('hidden');
        });
        document.getElementById('btn-search-submit').addEventListener('click', () => {
            this.filterAndRenderRides();
            this.navigate('screen-results');
        });
        document.getElementById('btn-confirm-filters').addEventListener('click', () => {
            this.filterAndRenderRides();
            this.toggleMenu();
        });
        document.getElementById('btn-back-to-inbox').addEventListener('click', () => this.navigate('screen-inbox'));
    },
    toggleMenu: function() {
        document.getElementById('side-menu').classList.toggle('hidden');
    },
    limitSeats: function(e) {
        if(e.target.value > 8) e.target.value = 8;
        if(e.target.value < 1) e.target.value = 1;
    },
    handleAutocomplete: function(query, boxId, inputId) {
        const box = document.getElementById(boxId);
        box.innerHTML = "";
        if (!query) { box.classList.add('hidden'); return; }

        const filtered = this.mockLocations.filter(loc => loc.toLowerCase().includes(query.toLowerCase()));
        if (filtered.length > 0) {
            box.classList.remove('hidden');
            filtered.forEach(loc => {
                const item = document.createElement('div');
                item.className = "suggestion-item";
                item.innerText = loc;
                item.addEventListener('click', () => {
                    document.getElementById(inputId).value = loc;
                    box.classList.add('hidden');
                });
                box.appendChild(item);
            });
        } else {
            box.classList.add('hidden');
        }
    },
    buildCalendar: function(gridId, inputId, popupId) {
        const grid = document.getElementById(gridId);
        grid.innerHTML = "";
        for (let i = 1; i <= 31; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = "calendar-day";
            dayEl.innerText = i;
            if (i === 27) dayEl.classList.add('today');
            dayEl.addEventListener('click', () => {
                document.getElementById(inputId).value = `${i}. Maj 2026`;
                document.getElementById(popupId).classList.add('hidden');
            });
            grid.appendChild(dayEl);
        }
    },
    buildTimePicker: function() {
        const hoursList = document.getElementById('time-hours-list');
        const minutesList = document.getElementById('time-minutes-list');
        for (let h = 0; h < 24; h++) {
            const hourStr = h < 10 ? `0${h}` : `${h}`;
            const item = document.createElement('div');
            item.className = "time-unit-item";
            item.innerText = hourStr;
            item.addEventListener('click', () => {
                this.selectedHour = hourStr;
                document.querySelectorAll('#time-hours-list .time-unit-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
            });
            hoursList.appendChild(item);
        }
        for (let m = 0; m < 60; m += 5) {
            const minStr = m < 10 ? `0${m}` : `${m}`;
            const item = document.createElement('div');
            item.className = "time-unit-item";
            item.innerText = minStr;
            item.addEventListener('click', () => {
                this.selectedMinute = minStr;
                document.querySelectorAll('#time-minutes-list .time-unit-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
            });
            minutesList.appendChild(item);
        }
    },
    filterAndRenderRides: function() {
    const maxPrice =
        parseFloat(
            document.getElementById('filter-max-price').value
        ) || Infinity;
    const minRating =
        parseFloat(
            document.getElementById('filter-rating').value
        ) || 0;
    const rides =
        document.querySelectorAll('.ride-card');
    rides.forEach(ride => {
        const price =
            parseFloat(
                ride.dataset.price
            );
        const rating =
            parseFloat(
                ride.dataset.rating
            );
        let visible = true;
        if(price > maxPrice) {
            visible = false;
        }
        if(rating < minRating) {
            visible = false;
        }
        if(this.requestedSeats > 4) {
            visible = false;
        }
        if(visible) {
            ride.classList.remove('hidden');
        } else {
            ride.classList.add('hidden');
        }
    });
},
switchProfileMode: function(mode) {
        document.querySelectorAll('.switch-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`profile-${mode}-view`).classList.remove('hidden');
        
        if (mode === 'passenger') {
            document.getElementById('mode-passenger').classList.add('active');
            document.getElementById('profile-driver-view').classList.add('hidden');
        } else {
            document.getElementById('mode-driver').classList.add('active');
            document.getElementById('profile-passenger-view').classList.add('hidden');
        }
    },
    toggleCollapse: function(id) {
        document.getElementById(id).classList.toggle('hidden');
    },
    handleDeleteAccount: function() {
        if (confirm("Da li ste sigurni da želite trajno da obrišete Vaš nalog?")) {
            alert("Vaš nalog je uspešno obrisan.");
            window.location.reload();
        }
    },
    navigate: function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
        document.getElementById(id).classList.remove('hidden');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if(id === 'screen-home') document.querySelectorAll('.nav-btn')[0].classList.add('active');
        if(id === 'screen-inbox' || id === 'screen-chat') document.querySelectorAll('.nav-btn')[1].classList.add('active');
        if(id === 'screen-profile') document.querySelectorAll('.nav-btn')[2].classList.add('active');
    },
    openChat: function() { 
        this.navigate('screen-chat'); 
    },
    openRegisterModal: function() {
        document
            .getElementById('register-modal')
            .classList.remove('hidden');
    },
    closeRegisterModal: function() {
        document
            .getElementById('register-modal')
            .classList.add('hidden');
    },
    togglePassword: function(inputId, el) {
        const input =
            document.getElementById(inputId);
        if(input.type === "password") {
            input.type = "text";
            el.innerText = "🙈";

        } else {
            input.type = "password";
            el.innerText = "👁";
        }
    },
    login: function() {
    const email =
        document.getElementById('login-email').value.trim();
    const password =
        document.getElementById('login-password').value;
    const user = this.users.find(u =>
        u.email === email &&
        u.password === password
    );
    if(user) {
        this.currentUser = user;
        document
    .getElementById('main-header')
    .classList.remove('hidden');
        document
    .getElementById('main-footer')
    .classList.remove('hidden');
        document
            .getElementById('screen-auth')
            .classList.add('hidden');
        this.navigate('screen-home');
    } else {
        alert(
            'Nalog ne postoji ili je obrisan. Registrujte se ponovo.'
        );
    }
},
    register: function() {
    const name =
        document.getElementById('register-name').value.trim();
    const birthdate =
        document.getElementById('register-birthdate').value;
    const email =
        document.getElementById('register-email').value.trim();
    const password =
        document.getElementById('register-password').value;
    const confirmPassword =
        document.getElementById('register-confirm-password').value;
    if(!name || !birthdate || !email || !password || !confirmPassword) {
        alert('Popunite sva obavezna polja.');
        return;
    }
    const birth = new Date(birthdate);
    const today = new Date();
    let age =
        today.getFullYear() - birth.getFullYear();
    const monthDiff =
        today.getMonth() - birth.getMonth();
    if(
        monthDiff < 0 ||
        (
            monthDiff === 0 &&
            today.getDate() < birth.getDate()
        )
    ) {
        age--;
    }
    if(age < 18) {
        alert('Morate biti punoletni za registraciju.');
        return;
    }
    if(password !== confirmPassword) {
        alert('Lozinke se ne poklapaju.');
        return;
    }
    const existing =
        this.users.find(
            u => u.email === email
        );
    if(existing) {
        alert('Nalog već postoji.');
        return;
    }
    this.users.push({
        email,
        password,
        name
    });
    alert('Registracija uspešna!');
    this.currentUser = {
    email,
    password,
    name
};
this.closeRegisterModal();
document
    .getElementById('main-header')
    .classList.remove('hidden');
document
    .getElementById('main-footer')
    .classList.remove('hidden');
document
    .getElementById('screen-auth')
    .classList.add('hidden');
this.navigate('screen-home');
this.clearAuthForms();
},
    logout: function() {
    this.currentUser = null;
    document
    .getElementById('main-header')
    .classList.add('hidden');
    document
    .getElementById('main-footer')
    .classList.add('hidden');
    alert('Uspešno ste se odjavili.');
    this.clearAuthForms();
    document
        .querySelectorAll('.screen')
        .forEach(s =>
            s.classList.add('hidden')
        );
    document
        .getElementById('screen-auth')
        .classList.remove('hidden');
},
    deleteAccount: function() {
    if(!this.currentUser) {
        return;
    }
    const confirmed = confirm(
        'Da li ste sigurni da želite da obrišete nalog?'
    );
    if(!confirmed) return;
    this.users = this.users.filter(
        u => u.email !== this.currentUser.email
    );
    this.currentUser = null;
    document
    .getElementById('main-header')
    .classList.add('hidden');
    document
    .getElementById('main-footer')
    .classList.add('hidden');
    alert('Nalog je uspešno obrisan.');
    this.clearAuthForms();
    document
        .querySelectorAll('.screen')
        .forEach(s =>
            s.classList.add('hidden')
        );
    document
        .getElementById('screen-auth')
        .classList.remove('hidden');
},
initProfileUpload: function() {
    const upload =
        document.getElementById('profile-upload');
    upload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document
                    .getElementById('profile-image')
                    .src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
},
openCamera: function() {
    const input =
        document.getElementById('profile-upload');

    input.setAttribute('capture', 'environment');
    input.click();
},
clearAuthForms: function() {
    document.getElementById('login-email').value = "";
    document.getElementById('login-password').value = "";
    document.getElementById('register-name').value = "";
    document.getElementById('register-lastname').value = "";
    document.getElementById('register-birthdate').value = "";
    document.getElementById('register-phone').value = "";
    document.getElementById('register-email').value = "";
    document.getElementById('register-password').value = "";
    document.getElementById('register-confirm-password').value = "";
}
};
document.addEventListener('DOMContentLoaded', () => app.init());