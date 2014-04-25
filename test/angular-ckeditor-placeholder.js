var expect = chai.expect;

describe('CKEditor placeholder directive', function () {
  var $compile, $rootScope, scope;

  beforeEach(module('ckeditorPlaceholder'));

  beforeEach(inject(function ($injector) {
    $compile = $injector.get('$compile');
    $rootScope = $injector.get('$rootScope');
    scope = $rootScope.$new();
  }));

  afterEach(function () {
    // Destroy all CKEditor instances.
    _.invoke(CKEDITOR.instances, 'destroy');
  });

  it('should display placeholder if empty', function (done) {
    scope.onReady = function () {
      setTimeout(function () {
        expect(element).to.contain('test');
        scope.$digest();
        expect(scope.content).to.equal('');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should hide placeholder when we set data', function (done) {
    scope.onReady = function () {
      setTimeout(function () {
        expect(element).to.contain('test');
        scope.content = 'hello';
        scope.$digest();
        expect(scope.content).to.equal('hello');
        expect(element).to.contain('hello');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should hide placeholder when we focus', function (done) {
    scope.onReady = function () {
      setTimeout(function () {
        expect(element).to.contain('test');
        _.find(CKEDITOR.instances).fire('focus');
        expect(element).to.not.contain('test');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });

  it('should show placeholder when blur', function (done) {
    scope.content = 'hello';

    scope.onReady = function () {
      setTimeout(function () {
        expect(element).to.contain('hello');
        scope.content = '';
        scope.$digest();
        _.find(CKEDITOR.instances).fire('blur');
        expect(element).to.contain('test');
        done();
      }, 0);
    };

    var element = $compile('<div ckeditor placeholder="test" ng-model="content" ready="onReady()"></div>')(scope);
  });
});