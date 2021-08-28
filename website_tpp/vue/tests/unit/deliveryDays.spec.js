import deliveryDays from '@/helpers/deliveryDays.js'
import { nextDeliveryDays, getNextDeliveryDay, getNextPossibleDeliveryDay } from '@/helpers/deliveryDays.js'
import moment from 'moment';

global.moment = moment;


describe('deliveryDays.js', () => {
 
    it('Caters for no parameters', () => {
        expect(deliveryDays()).toEqual('');
    })

    it('Caters for no matching freq parameters', () => {
        expect(deliveryDays('10-Aug-18','Junk',3)).toEqual('');
    })

    it('Daily frequency skips Sundays', () => {
        expect(deliveryDays('10-Aug-18','Daily',3))
        .toEqual('10-Aug-2018, 11-Aug-2018, 13-Aug-2018');
    });

    it('Daily frequency skips Christmas', () => {
        expect(deliveryDays('24-Dec-18','Daily',3))
        .toEqual('24-Dec-2018, 29-Dec-2018, 31-Dec-2018');
    });

    it('Daily frequency skips New Years Day', () => {
        expect(deliveryDays('31-Dec-18','Daily',3))
        .toEqual('31-Dec-2018, 03-Jan-2019, 04-Jan-2019');
    });

    it('Daily frequency skips Australia Day', () => {
        expect(deliveryDays('25-Jan-19','Daily',3))
        .toEqual('25-Jan-2019, 28-Jan-2019, 29-Jan-2019');
    });

    it('Daily frequency skips Anzac Day', () => {
        expect(deliveryDays('24-Apr-19','Daily',3))
        .toEqual('24-Apr-2019, 26-Apr-2019, 27-Apr-2019');
    });

    it('Daily frequency skips Queens Birthday', () => {
        expect(deliveryDays('7-Jun-19','Daily',3))
        .toEqual('07-Jun-2019, 08-Jun-2019, 11-Jun-2019');
    });

    it('Daily frequency skips NSW Labour Day', () => {
        expect(deliveryDays('1-Oct-18','Daily',3))
        .toEqual('02-Oct-2018, 03-Oct-2018, 04-Oct-2018');
    });

    it('Daily frequency skips Easter', () => {
        expect(deliveryDays('18-Apr-19','Daily',3))
        .toEqual('18-Apr-2019, 20-Apr-2019, 23-Apr-2019');
    });

    it('Weekly frequency skips Christmas', () => {
        expect(deliveryDays('18-Dec-18','Weekly',3))
        .toEqual('18-Dec-2018, 29-Dec-2018, 03-Jan-2019');
    });

    it('Fortnightly frequency skips Christmas', () => {
        expect(deliveryDays('11-Dec-18','Fortnightly',3))
        .toEqual('11-Dec-2018, 29-Dec-2018, 08-Jan-2019');
    });

    it('Monthly frequency skips Christmas', () => {
        expect(deliveryDays('25-Nov-18','Monthly',3))
        .toEqual('26-Nov-2018, 29-Dec-2018, 25-Jan-2019');
    });

    it('Can handle just finding a single next date', () => {
        expect(deliveryDays('25-Nov-18','Monthly',1))
        .toEqual('26-Nov-2018');
    });

    it('Can give a list of next 90 Delivery Days', () => {
        expect(nextDeliveryDays(90).length).toEqual(90);
    });

    it('Can get next delivery day after a Sunday', () => {
        expect(getNextDeliveryDay('07-Oct-18')).toEqual('08-Oct-2018');
    });

    // test only works when today is a valid delivery day
    it('Can get next delivery day given undefined', () => {
        expect(getNextDeliveryDay()).toEqual(moment().format('DD-MMM-YYYY'));
    });

    // test only works when today is a valid delivery day
    it('Can get next delivery day given junk', () => {
        expect(getNextDeliveryDay('abc')).toEqual(moment().format('DD-MMM-YYYY'));
    });

    // test only works when today is a valid delivery day
    it('Can get next possible delivery day given a day in the past', () => {
        expect(getNextPossibleDeliveryDay('04-Oct-2018')).toEqual(moment().format('DD-MMM-YYYY'));
    });

});