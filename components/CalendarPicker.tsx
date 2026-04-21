import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import Svg, { Polyline, Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PICKER_WIDTH = Math.min(SCREEN_WIDTH - 48, 340);
const ACCENT = '#F9A825';
const BLUE = '#1565C0';

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const YEAR_START = 1924;
const YEAR_END = new Date().getFullYear() + 10;
const ALL_YEARS = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i);

type PickerView = 'year' | 'month' | 'date';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDay(y: number, m: number) { return new Date(y, m, 1).getDay(); }
function fmt(d: Date) {
  return `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconEdit = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth={2}>
    <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Svg>
);

const IconLeft = ({ color = '#888' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5}>
    <Polyline points="15 18 9 12 15 6" />
  </Svg>
);

const IconRight = ({ color = '#888' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5}>
    <Polyline points="9 18 15 12 9 6" />
  </Svg>
);

const IconDown = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth={2.5}>
    <Polyline points="6 9 12 15 18 9" />
  </Svg>
);

const IconCalendar = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth={2}>
    <Path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
  </Svg>
);

// ─── Year Selector ────────────────────────────────────────────────────────────

interface YearSelectorProps {
  selected: number;
  onSelect: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ selected, onSelect }) => {
  const idx = ALL_YEARS.indexOf(selected);
  const ref = useRef<FlatList>(null);

  return (
    <FlatList
      ref={ref}
      data={ALL_YEARS}
      keyExtractor={(y) => String(y)}
      initialScrollIndex={Math.max(0, idx - 3)}
      getItemLayout={(_, i) => ({ length: 48, offset: 48 * i, index: i })}
      showsVerticalScrollIndicator={false}
      style={{ height: 270 }}
      contentContainerStyle={{ paddingVertical: 8 }}
      renderItem={({ item: year }) => {
        const isSel = year === selected;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onSelect(year)}
            style={[styles.yearRow, isSel && styles.yearRowSelected]}
          >
            <Text style={[styles.yearText, isSel && styles.yearTextSelected]}>
              {year}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

// ─── Month Selector ───────────────────────────────────────────────────────────

interface MonthSelectorProps {
  selected: number;
  onSelect: (month: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ selected, onSelect }) => (
  <View style={styles.monthGrid}>
    {MONTHS_LONG.map((_, i) => {
      const isSel = i === selected;
      return (
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          onPress={() => onSelect(i)}
          style={[styles.monthCell, isSel && styles.monthCellSelected]}
        >
          <Text style={[styles.monthCellText, isSel && styles.monthCellTextSelected]}>
            {MONTHS_SHORT[i]}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Date Grid ────────────────────────────────────────────────────────────────

interface DateGridProps {
  year: number;
  month: number;
  selected: Date;
  onSelect: (d: Date) => void;
}

const DateGrid: React.FC<DateGridProps> = ({ year, month, selected, onSelect }) => {
  const days = daysInMonth(year, month);
  const start = firstDay(year, month);
  const cells: (number | null)[] = [
    ...Array(start).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <View>
      <View style={styles.row}>
        {WEEK_DAYS.map((d, i) => (
          <View key={i} style={styles.dayCell}>
            <Text style={styles.weekDayText}>{d}</Text>
          </View>
        ))}
      </View>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {row.map((day, ci) => {
            const isSel =
              day !== null &&
              selected.getFullYear() === year &&
              selected.getMonth() === month &&
              selected.getDate() === day;
            return (
              <View key={ci} style={styles.dayCell}>
                {day !== null && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => onSelect(new Date(year, month, day))}
                    style={[styles.dayInner, isSel && styles.daySelected]}
                  >
                    <Text style={[styles.dayText, isSel && styles.dayTextSelected]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

// ─── Picker Modal ─────────────────────────────────────────────────────────────

interface DatePickerModalProps {
  visible: boolean;
  initialDate?: Date;
  onConfirm: (date: Date) => void;
  onDismiss: () => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible, initialDate, onConfirm, onDismiss,
}) => {
  const init = initialDate ?? new Date();

  const [selected, setSelected] = useState<Date>(init);
  const [viewYear, setViewYear] = useState(init.getFullYear());
  const [viewMonth, setViewMonth] = useState(init.getMonth());
  const [activeView, setActiveView] = useState<PickerView>('date');

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchView = (next: PickerView) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setActiveView(next);
  };

  const changeMonth = (dir: number) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m > 11) { m = 0; y += 1; }
    if (m < 0) { m = 11; y -= 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  const onYearPick = (year: number) => {
    setViewYear(year);
    switchView('month');
  };

  const onMonthPick = (month: number) => {
    setViewMonth(month);
    switchView('date');
  };

  const navLabel =
    activeView === 'year' ? 'Select year' :
      activeView === 'month' ? String(viewYear) :
        `${MONTHS_LONG[viewMonth]} ${viewYear}`;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.card}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Select date</Text>
            <View style={styles.headerRow}>
              <Text style={styles.headerDate}>{fmt(selected)}</Text>
              {/* <TouchableOpacity style={styles.editBtn}>
                <IconEdit />
              </TouchableOpacity> */}
            </View>

            {/* Step breadcrumb pills */}
            <View style={styles.stepRow}>
              <TouchableOpacity
                onPress={() => switchView('year')}
                style={[styles.stepPill, activeView === 'year' && styles.stepPillActive]}
              >
                <Text style={[styles.stepText, activeView === 'year' && styles.stepTextActive]}>
                  {viewYear}
                </Text>
              </TouchableOpacity>
              <Text style={styles.stepSep}>›</Text>
              <TouchableOpacity
                onPress={() => switchView('month')}
                style={[styles.stepPill, activeView === 'month' && styles.stepPillActive]}
              >
                <Text style={[styles.stepText, activeView === 'month' && styles.stepTextActive]}>
                  {MONTHS_SHORT[viewMonth]}
                </Text>
              </TouchableOpacity>
              <Text style={styles.stepSep}>›</Text>
              <TouchableOpacity
                onPress={() => switchView('date')}
                style={[styles.stepPill, activeView === 'date' && styles.stepPillActive]}
              >
                <Text style={[styles.stepText, activeView === 'date' && styles.stepTextActive]}>
                  Day
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Nav bar */}
          <View style={styles.monthNav}>
            {activeView !== 'year' && (
              <TouchableOpacity
                onPress={() =>
                  activeView === 'date' ? changeMonth(-1) : setViewYear(y => y - 1)
                }
                style={styles.navBtn}
              >
                <IconLeft />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.monthLabelBtn}
              onPress={() =>
                switchView(
                  activeView === 'date' ? 'month' :
                    activeView === 'month' ? 'year' : 'date'
                )
              }
            >
              <Text style={styles.monthLabelText}>{navLabel}</Text>
              <IconDown />
            </TouchableOpacity>
            {activeView !== 'year' && (
              <TouchableOpacity
                onPress={() =>
                  activeView === 'date' ? changeMonth(1) : setViewYear(y => y + 1)
                }
                style={styles.navBtn}
              >
                <IconRight />
              </TouchableOpacity>
            )}
          </View>

          {/* Animated view area */}
          <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
            {activeView === 'year' && (
              <YearSelector selected={viewYear} onSelect={onYearPick} />
            )}
            {activeView === 'month' && (
              <MonthSelector selected={viewMonth} onSelect={onMonthPick} />
            )}
            {activeView === 'date' && (
              <DateGrid
                year={viewYear}
                month={viewMonth}
                selected={selected}
                onSelect={setSelected}
              />
            )}
          </Animated.View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onDismiss} style={styles.actionBtn}>
              <Text style={styles.actionText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onConfirm(selected)} style={styles.actionBtn}>
              <Text style={styles.actionText}>OK</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

// ─── Trigger Field ────────────────────────────────────────────────────────────

interface CalendarPickerProps {
  label?: string;
  value?: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
  label, value, onChange, placeholder = 'Select Date',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.fieldLabel}>{label}</Text>}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
        style={styles.inputCard}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value ? fmt(value) : placeholder}
        </Text>
        <IconCalendar />
      </TouchableOpacity>

      <DatePickerModal
        visible={open}
        initialDate={value}
        onConfirm={(date) => { onChange(date); setOpen(false); }}
        onDismiss={() => setOpen(false)}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Trigger field
  container: { marginVertical: 10 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  inputCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, height: 60, backgroundColor: '#fff' },
  valueText: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  placeholderText: { color: '#94A3B8', fontWeight: '400' },

  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  card: { width: PICKER_WIDTH, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden' },

  // Header
  header: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 12 },
  headerLabel: { fontSize: 12, color: '#888', marginBottom: 4, letterSpacing: 0.5 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerDate: { fontSize: 24, fontWeight: '500', color: '#1a1a1a' },
  editBtn: { padding: 4 },

  // Step pills
  stepRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 4 },
  stepPill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, backgroundColor: '#f0f0f0' },
  stepPillActive: { backgroundColor: ACCENT },
  stepText: { fontSize: 12, fontWeight: '600', color: '#555' },
  stepTextActive: { color: '#fff' },
  stepSep: { fontSize: 14, color: '#bbb' },

  divider: { height: 0.5, backgroundColor: '#E0E0E0' },

  // Nav bar
  monthNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4 },
  navBtn: { padding: 8, borderRadius: 20 },
  monthLabelBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  monthLabelText: { fontSize: 14, fontWeight: '500', color: '#1a1a1a', marginRight: 2 },

  // Body
  body: { paddingHorizontal: 12, paddingBottom: 4, minHeight: 270 },

  // Year list
  yearRow: { height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 12, marginHorizontal: 40, marginVertical: 2 },
  yearRowSelected: { backgroundColor: ACCENT },
  yearText: { fontSize: 18, color: '#1a1a1a' },
  yearTextSelected: { color: '#fff', fontWeight: '700' },

  // Month grid
  monthGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 16, gap: 10, justifyContent: 'center' },
  monthCell: { width: (PICKER_WIDTH - 96) / 3, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  monthCellSelected: { backgroundColor: ACCENT },
  monthCellText: { fontSize: 13, fontWeight: '500', color: '#1a1a1a' },
  monthCellTextSelected: { color: '#fff', fontWeight: '700' },

  // Date grid
  row: { flexDirection: 'row' },
  dayCell: { flex: 1, alignItems: 'center', justifyContent: 'center', height: 38 },
  weekDayText: { fontSize: 12, color: '#888' },
  dayInner: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  daySelected: { backgroundColor: ACCENT },
  dayText: { fontSize: 13, color: '#1a1a1a' },
  dayTextSelected: { color: '#fff', fontWeight: '600' },

  // Actions
  actions: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, gap: 8 },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 4 },
  actionText: { fontSize: 14, fontWeight: '600', color: BLUE },
});

export default CalendarPicker;