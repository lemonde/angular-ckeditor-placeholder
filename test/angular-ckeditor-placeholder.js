var expect = chai.expect;

describe('CKEditor placeholder directive', function () {
  var $compile, $rootScope, $timeout, scope;

  beforeEach(module('ckeditorPlaceholder'));

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
    $timeout = $injector.get('$timeout');
    scope = $rootScope.$new();
  }));

  afterEach(function () {
    // Destroy all CKEditor instances.
    _.invoke(CKEDITOR.instances, 'destroy');
  });

  it('should display placeholder if empty', function (done) {
    scope.onReady = function () {
      $timeout.flush();
      expect(element).to.contain('test');
      setTimeout(function () {
        expect(scope.content).to.equal('');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor contenteditable="true" placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should hide placeholder when we set data', function (done) {
    scope.onReady = function () {
      $timeout.flush();
      expect(element).to.contain('test');
      scope.content = 'hello';
      scope.$digest();
      setTimeout(function () {
        // NOTE : we have to trim CK model since CK adds \n and blanks to do formatting
        // cf. http://dev.ckeditor.com/ticket/3260
        expect(_.str.trim(scope.content)).to.equal('<p>hello</p>');
        expect(element).to.contain('hello');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor contenteditable="true" placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should hide placeholder when we focus', function (done) {
    scope.onReady = function () {
      $timeout.flush();
      expect(element).to.contain('test');
      _.find(CKEDITOR.instances).fire('focus');
      setTimeout(function () {
        expect(element).to.not.contain('test');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor contenteditable="true" placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should show placeholder when blur', function (done) {
    scope.content = 'hello';

    scope.onReady = function () {
      $timeout.flush();
      expect(element).to.contain('hello');
      scope.content = '';
      scope.$digest();
      setTimeout(function () {
        _.find(CKEDITOR.instances).fire('blur');
        expect(element).to.contain('test');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor contenteditable="true" placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should show with setData null', function (done) {
    scope.onReady = function () {
      $timeout.flush();
      expect(element).to.contain('test');
      scope.$digest();
      setTimeout(function () {
        _.find(CKEDITOR.instances).setData(null);
        $timeout.flush();
        expect(element).to.contain('test');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor contenteditable="true" placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });
});