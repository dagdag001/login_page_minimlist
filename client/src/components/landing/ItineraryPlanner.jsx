import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Calendar, Clock, MapPin, Plus, GripVertical, Trash2, Edit, Save } from "lucide-react";

const sampleActivities = [
  { id: "1", name: "Visit Eiffel Tower", time: "09:00 AM", duration: "2 hours", location: "Paris, France", type: "sightseeing" },
  { id: "2", name: "Lunch at Le Marais", time: "12:00 PM", duration: "1.5 hours", location: "Le Marais", type: "food" },
  { id: "3", name: "Louvre Museum", time: "02:00 PM", duration: "3 hours", location: "Paris, France", type: "culture" },
  { id: "4", name: "Seine River Cruise", time: "06:00 PM", duration: "2 hours", location: "Seine River", type: "leisure" }
];

const activityTypes = {
  sightseeing: { color: "from-blue-500 to-blue-600", icon: "🏛️" },
  food: { color: "from-orange-500 to-orange-600", icon: "🍽️" },
  culture: { color: "from-purple-500 to-purple-600", icon: "🎭" },
  leisure: { color: "from-green-500 to-green-600", icon: "🚤" },
  adventure: { color: "from-red-500 to-red-600", icon: "🏔️" }
};

export function ItineraryPlanner() {
  const [days, setDays] = useState([
    { id: 1, date: "Day 1 - June 15, 2026", activities: sampleActivities }
  ]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: "",
    time: "",
    duration: "",
    location: "",
    type: "sightseeing"
  });

  const handleReorder = (newOrder) => {
    const updatedDays = [...days];
    updatedDays[selectedDay].activities = newOrder;
    setDays(updatedDays);
  };

  const addActivity = () => {
    if (!newActivity.name || !newActivity.time) return;
    
    const activity = {
      id: Date.now().toString(),
      ...newActivity
    };
    
    const updatedDays = [...days];
    updatedDays[selectedDay].activities.push(activity);
    setDays(updatedDays);
    setNewActivity({ name: "", time: "", duration: "", location: "", type: "sightseeing" });
    setShowAddActivity(false);
  };

  const deleteActivity = (activityId) => {
    const updatedDays = [...days];
    updatedDays[selectedDay].activities = updatedDays[selectedDay].activities.filter(
      a => a.id !== activityId
    );
    setDays(updatedDays);
  };

  const addDay = () => {
    setDays([...days, {
      id: days.length + 1,
      date: `Day ${days.length + 1} - June ${15 + days.length}, 2026`,
      activities: []
    }]);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Perfect Itinerary
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Drag and drop to organize your daily activities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Day Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Days</h3>
              <div className="space-y-2">
                {days.map((day, index) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedDay === index
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="font-semibold">{day.date.split(" - ")[0]}</div>
                    <div className="text-sm opacity-90">{day.activities.length} activities</div>
                  </button>
                ))}
                <button
                  onClick={addDay}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Day</span>
                </button>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{days[selectedDay].date}</h3>
                  <p className="text-gray-600">Drag to reorder activities</p>
                </div>
                <button
                  onClick={() => setShowAddActivity(!showAddActivity)}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Activity</span>
                </button>
              </div>

              {/* Add Activity Form */}
              {showAddActivity && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-6 bg-orange-50 rounded-2xl"
                >
                  <h4 className="font-bold text-gray-900 mb-4">New Activity</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Activity name"
                      value={newActivity.name}
                      onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    />
                    <input
                      type="time"
                      value={newActivity.time}
                      onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2 hours)"
                      value={newActivity.duration}
                      onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 mb-4">
                    {Object.keys(activityTypes).map(type => (
                      <button
                        key={type}
                        onClick={() => setNewActivity({ ...newActivity, type })}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                          newActivity.type === type
                            ? `bg-gradient-to-r ${activityTypes[type].color} text-white`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {activityTypes[type].icon} {type}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={addActivity}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                  >
                    Add to Itinerary
                  </button>
                </motion.div>
              )}

              {/* Draggable Activities */}
              <Reorder.Group
                axis="y"
                values={days[selectedDay].activities}
                onReorder={handleReorder}
                className="space-y-3"
              >
                {days[selectedDay].activities.map((activity) => (
                  <Reorder.Item
                    key={activity.id}
                    value={activity}
                    className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all cursor-move"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="cursor-grab active:cursor-grabbing">
                        <GripVertical className="w-6 h-6 text-gray-400" />
                      </div>
                      
                      <div className={`w-12 h-12 bg-gradient-to-r ${activityTypes[activity.type].color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                        {activityTypes[activity.type].icon}
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{activity.name}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteActivity(activity.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              {days[selectedDay].activities.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No activities planned for this day yet.</p>
                  <p className="text-sm">Click "Add Activity" to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
