// script.js
document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar');
    const daysContainer = document.getElementById('days');
    const monthYearDisplay = document.getElementById('monthYear');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const eventForm = document.getElementById('eventForm');
    const eventTitleInput = document.getElementById('eventTitle');
    const eventDateInput = document.getElementById('eventDate');
    const eventTimeInput = document.getElementById('eventTime');
    const eventColorInput = document.getElementById('eventColor');
    const eventDescriptionInput = document.getElementById('eventDescription');
    const eventParticipantsInput = document.getElementById('eventParticipants');
    const saveEventButton = document.getElementById('saveEvent');
    const deleteEventButton = document.getElementById('deleteEvent');
    let events = [];
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let selectedEventIndex = null;

    function loadCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        monthYearDisplay.textContent = `${firstDay.toLocaleString('es-ES', { month: 'long' })} ${currentYear}`;
        daysContainer.innerHTML = '';
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = document.createElement('div');
            day.textContent = i;
            day.dataset.date = new Date(currentYear, currentMonth, i).toISOString().split('T')[0];
            day.addEventListener('click', function() {
                eventDateInput.value = this.dataset.date;
                eventForm.style.display = 'block';
                deleteEventButton.style.display = 'none';
                selectedEventIndex = null;
            });
            daysContainer.appendChild(day);
        }
        renderEvents();
    }

    function renderEvents() {
        events.forEach((event, index) => {
            const eventDay = daysContainer.querySelector(`[data-date="${event.date}"]`);
            if (eventDay) {
                const eventSpan = document.createElement('span');
                eventSpan.textContent = `${event.time} - ${event.title}`;
                eventSpan.style.backgroundColor = event.color;
                eventSpan.addEventListener('click', function(e) {
                    e.stopPropagation();
                    eventTitleInput.value = event.title;
                    eventDateInput.value = event.date;
                    eventTimeInput.value = event.time;
                    eventColorInput.value = event.color;
                    eventDescriptionInput.value = event.description;
                    eventParticipantsInput.value = event.participants;
                    eventForm.style.display = 'block';
                    deleteEventButton.style.display = 'block';
                    selectedEventIndex = index;
                });
                eventDay.appendChild(eventSpan);
            }
        });
    }

    prevButton.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        loadCalendar();
    });

    nextButton.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        loadCalendar();
    });

    saveEventButton.addEventListener('click', function() {
        const eventTitle = eventTitleInput.value;
        const eventDate = eventDateInput.value;
        const eventTime = eventTimeInput.value;
        const eventColor = eventColorInput.value;
        const eventDescription = eventDescriptionInput.value;
        const eventParticipants = eventParticipantsInput.value;
        if (eventTitle && eventDate && eventTime && eventColor) {
            const newEvent = {
                title: eventTitle,
                date: eventDate,
                time: eventTime,
                color: eventColor,
                description: eventDescription,
                participants: eventParticipants
            };
            if (selectedEventIndex !== null) {
                events[selectedEventIndex] = newEvent;
            } else {
                events.push(newEvent);
            }
            loadCalendar();
            eventForm.style.display = 'none';
            clearForm();
        }
    });

    deleteEventButton.addEventListener('click', function() {
        if (selectedEventIndex !== null) {
            events.splice(selectedEventIndex, 1);
            loadCalendar();
            eventForm.style.display = 'none';
            clearForm();
        }
    });

    function clearForm() {
        eventTitleInput.value = '';
        eventDateInput.value = '';
        eventTimeInput.value = '';
        eventColorInput.value = '#4CAF50';
        eventDescriptionInput.value = '';
        eventParticipantsInput.value = '';
        selectedEventIndex = null;
    }

    loadCalendar();
});
