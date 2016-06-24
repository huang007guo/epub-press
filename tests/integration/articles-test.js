const assert = require('chai').assert;
const fs = require('fs');
const ContentExtractor = require('../../lib/content-extractor');
const Book = require('../../lib/book');

const articleFixtures = `${__dirname}/../fixtures/articles`;

describe('Article Extraction', () => {
    [{
        fixture: 'new-york-times',
        title: 'In Cramped and Costly Bay Area, Cries to Build, Baby, Build',
        include: ['The organization also inflamed Sierra Club'],
        notInclude: ['<script>'],
    },
    {
        fixture: 'blogspot',
        title: 'Sober Security: Software end of life matters!',
        include: [
            'End the life of the hardware (brick it)',
            'Anytime you work on a software project,',
        ],
    },
    {
        fixture: 'elastic-search',
        title: 'Cluster Health',
        include: [
            'which we can use to see how our cluster is doing',
            'Here, we can see our one node named',
        ],
    },
    {
        fixture: 'thestack',
        title: 'Sites that block adblockers seem to be suffering',
        include: [
            'For news publishers the world is constantly ending',
            'If one was willing to read the trends with a more paranoid eye',
        ],
    },
    {
        fixture: 'stripe-blog',
        title: 'BYOT',
        include: [
            'Do you know anyone who makes you incredibly better at what you do?',
            'This is an experiment and we’ll tweak it as we go.',
        ],
    },
    {
        fixture: 'medium-docker',
        title: 'Docker For Mac Beta Review',
        include: [
            'VirtualBox and its nasty kernel extensions',
            'When ever Mac laptop has a lightweight and reliable Linux container',
            'been following community efforts about running Docker',
            'My initial impressions are extremely positive.',
            '<img',
        ],
        notInclude: ['progressiveMedia-thumbnail'],
    },
    {
        fixture: 'historytoday',
        title: 'The Black Death: The Greatest Catastrophe Ever',
        include: [
            'disastrous mortal disease known as the Black Death spread across Europe in the years',
            'This dramatic fall in Europe',
        ],
    },
    {
        fixture: 'telegraph-uk',
        title: 'Biologist who snatched eggs from nests of world\'s rarest bird wins the \'Nobel prize\' of conservation', //eslint-disable-line
        include: [
            'Welsh biologist once criticised for stealing eggs from',
            'When the 61-year-old first travelled to the east African',
            'But the biologist, now chief scientist of the Durrell',
        ],
    },
    {
        fixture: 'buzzfeed',
        title: 'Inside Palantir, Silicon Valley\'s Most Secretive Company',
        include: [
            '<b>A trove of internal</b> documents and insider interviews has pulled back the',
            'More than 100 Palantir employees, including several prominent managers',
            'Palantir, like other highly valued tech “unicorns,” has long avoided',
            'But they can also produce lucrative results',
            'definitely been a little bit of a shift from bookings to cash',
        ],
        notInclude: ['rel:buzz_num'],
    },
    {
        fixture: 'kayiprihtim',
        title: '', // Filled in by fallback title
        include: [
            'nice seneler diliyoruz',
            'roman sitelerinden',
        ],
        notInclude: ['Yorum', 'Kategoriler'],
    },
    {
        fixture: 'elektrek',
        title: 'Spectacular Tesla Model S crash after flying 82+ft in the air shows importance of a large crumple zone [Gallery]', //eslint-disable-line
        include: [
            'Earlier this week, a 18-year old took her father',
            '<a href="http://electrek.co/2016/05/06/tesla-model-s-crash-large-crumple-zone-gallery',
            'http://electrek.co/2016/05/06/tesla-model-s-crash-large-crumple-zone-gallery/model-s',
            'Hopefully the 5 young adults recover quickly and can learn something from this accid',
        ],
        notInclude: ['9TO5MAC'],
    },
    {
        fixture: 'threatpost',
        title: 'Academics Make Theoretical Breakthrough in Random Number Generation',
        include: [
            'Two University of Texas academics have made what some experts believe is',
            'thrilled to have solved it',
            'You expect to see advances in steps',
        ],
        notInclude: ['Chrome Defaults to HTML5 over Adobe Flash Starting in Q4', 'Leave A Comment'],
    },
    {
        fixture: 'reddit-post',
        title: 'Inner Confidence Series: Introduction • /r/GetSuave',
        include: [
            'Thus far, just about everything you',
            'The World is More Malleable Than You Think',
            'Your mind shapes your experiences.',
            'techniques designed to circumvent your own fears and doubts were',
        ],
        notInclude: [
            'I am currently reading psycho-cybernetic',
            'all 2 comments',
            'Submit a new link',
        ],
    }, {
        fixture: 'github-readme',
        title: 'intelsdi-x/snap',
        include: [
            'is an open telemetry framework designed to simplify the collection',
            'Your contribution, through code and participation, is incredibly important to us.',
        ],
        notInclude: [
            'Fix plugin path in README.md',
        ],
    }, {
        fixture: 'moneycontrol',
        title: 'Skipper bags orders worth Rs 135 cr from Power Grid',
        include: [
            'Looking to bag orders worth Rs 300',
            'the filing added.',
        ],
        notInclude: [
            'Mutual Funds',
            'Defence stocks up',
        ],
    },
    {
        fixture: 'sousetsuka',
        title: 'Death March kara Hajimaru Isekai Kyousoukyoku 13-1',
        include: [
            'In order to escape the predicament',
            'More than 1000 nobles are lined up in the great audience hall',
            'I put the golden helmet again',
            'I said more to hold back Lulu who had stood up.',
            'work vigorously again tomorrow!',
        ],
        notInclude: [
            'He can literally just sit back',
            'Join the discussion',
            'for me how she deboned an assassin while they',
        ],
    },
    {
        fixture: 'mediashift',
        title: 'Columbia\'s Lede Program Aims to Go Beyond the Data Hype',
        include: [
            'This all began at Joe',
            'Big Data models and practices aren',
            'Data-driven journalism in larger contexts',
        ],
        notInclude: [
            'Self-Publishing Your Book: Where’s the Money',
            'About EducationShift',
        ],
    },
    {
        fixture: 'bloomberg',
        title: 'The 100-Year-Old Man Who Lives in the Future',
        include: [
            'To reach the Venus Project Research Center',
            'Fresco, now hard of hearing',
            'As for Fresco, he remains convinced his computer-governed city can become reality',
        ],
        notInclude: [
            'At least 53 other people were hospitalized',
            '50 Dead in Florida Nightclub Shooting',
        ],
    },
    {
        fixture: 'wedemain',
        title: 'Pour prévenir des inondations et préserver sa baie, San Francisco taxera ses habitants', // eslint-disable-line
        include: [
            'Au niveau mondial',
            'Relayée fin mai par',
            'San Francisco sera donc la',
        ],
        notInclude: [
            'Française et éco-construite',
        ],
    },
    {
        fixture: 'program-think',
        title: '回顾六四系列[30]：发起绝食的过程 @ 编程随想的博客',
        include: [
            '又到了一',
            '当时这番话',
            '在学运初期',
        ],
        notInclude: [
            '俺的招聘经验',
            '是避而不谈',
        ],
    },
    {
        fixture: 'business-insider',
        title: 'A top psychologist says there\'s only one way to become the best in your field', // eslint-disable-line
        include: [
            'As a teenager in Sweden,\n  Anders Ericsson used to play chess against one of his',
            'In the last few years,\n  however, Ericsson\'s findings on deliberate practice have',
            '"Partly because I am\n  Swedish," Ericsson said, "it took over 30 different drafts',
        ],
        notInclude: [
            'Orlando shooter',
        ],
    },
    {
        fixture: 'engadget',
        title: 'Google is working on a kill switch to prevent an AI uprising',
        include: [
            'Humans don\'t like the idea of not being at the top of the food chain',
            'The latter is considered more important',
            'Sleep tight.',
        ],
        notInclude: [
            'The TTIP Has Missed Its Political Moment',
        ],
    },
    {
        fixture: 'game-programming',
        title: 'Command · Design Patterns Revisited · Game Programming Patterns',
        include: [
            'Command is one of my favorite patterns',
            'Both terms mean taking some',
            'You may end up with a lot of different command classes',
        ],
        notInclude: [
            'You could make it a',
            'About The Book',
        ],
    },
    {
        fixture: 'npr',
        title: 'Scientists Say They\'ve Unearthed A Completely New Kind Of Meteorite',
        include: [
            'Scientists say that in a Swedish quarry',
            'Schmitz says that there are indications',
            'So he showed me the grains',
            'in addition to looking up at',
        ],
        notInclude: [
            'BBC Projects United Kingdom Votes To Leave The European Union',
            'Probably because of a geology',
            'Sign In',
        ],
    },
    {
        fixture: 'wattpad',
        title: 'Oda Nobuna no Yabou: Volume 11',
        include: [
            'Will the conqueror of the next',
            'Shikanosuke? What suffering, * pant pant *',
            'This Shikanosuke will not be pleased by being tormented',
            'Your engagement with Juubei and your love',
        ],
    },
    {
        fixture: 'wired',
        title: 'The Weirdest Senses Animals Have That You Don’t',
        include: [
            'imagine that they’re the pinnacle',
        ],
        notInclude: [
            'But ads help us keep the lights on.',
        ],
    }].forEach((testCase) => {
        it(`can extract ${testCase.fixture} articles`, (done) => {
            ContentExtractor.extract(
                fs.readFileSync(`${articleFixtures}/${testCase.fixture}.html`).toString()
            ).then((article) => {
                assert.equal(Book.sanitizeTitle(article.title), testCase.title);
                (testCase.include || []).forEach((content) => {
                    assert.include(article.content, content);
                });
                (testCase.notInclude || []).forEach((content) => {
                    assert.notInclude(article.content, content);
                });
                done();
            }).catch(done);
        }).timeout(4000);
    });
});
